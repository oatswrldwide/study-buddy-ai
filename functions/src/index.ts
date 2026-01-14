import {setGlobalOptions} from "firebase-functions";
import {onRequest, onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

// Initialize Firebase Admin
admin.initializeApp();

setGlobalOptions({maxInstances: 10});

/**
 * HTTP endpoint to create first admin (no auth required)
 * After creating your first admin, you can delete this function
 * 
 * Usage from terminal:
 * curl -X POST https://us-central1-studybuddy-a045b.cloudfunctions.net/createFirstAdmin \
 *   -H "Content-Type: application/json" \
 *   -d '{"email":"admin@example.com","password":"SecurePass123!","secret":"studybuddy-secret-2026"}'
 */
export const createFirstAdmin = onRequest(async (req, res) => {
  // CORS headers
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const {email, password, secret, name} = req.body;

  // Simple secret key protection
  const expectedSecret = "studybuddy-secret-2026";
  if (secret !== expectedSecret) {
    logger.error("Invalid secret key attempt");
    res.status(403).json({error: "Invalid secret key"});
    return;
  }

  if (!email || !password) {
    res.status(400).json({error: "Email and password are required"});
    return;
  }

  try {
    // Create the admin user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name || "Admin User",
      emailVerified: true,
    });

    logger.info("Created user:", userRecord.uid);

    // Set admin custom claim
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      role: "admin",
    });

    logger.info("Set admin claim for:", userRecord.uid);

    // Create admin document in Firestore
    await admin.firestore().collection("admin_users").doc(userRecord.uid).set({
      email,
      name: name || "Admin User",
      role: "admin",
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      permissions: ["all"],
    });

    logger.info("Admin document created:", userRecord.uid);

    res.status(200).json({
      success: true,
      uid: userRecord.uid,
      email: userRecord.email,
      message: `Admin created! Sign in at: https://studybuddy-a045b.web.app/login`,
    });
  } catch (error: any) {
    logger.error("Error creating admin:", error);
    res.status(500).json({
      error: `Failed to create admin: ${error.message}`,
    });
  }
});

/**
 * Callable function to create additional admin users (requires existing admin auth)
 */
export const createAdminUser = onCall(async (request) => {
  const {email, password, name} = request.data;

  // Only allow if request is from an admin
  if (!request.auth || request.auth.token.role !== "admin") {
    throw new Error("Only admins can create admin users");
  }

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name || "Admin User",
      emailVerified: true,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, {role: "admin"});

    await admin.firestore().collection("admin_users").doc(userRecord.uid).set({
      email,
      name: name || "Admin User",
      role: "admin",
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      permissions: ["all"],
    });

    logger.info("Admin user created by admin:", userRecord.uid);

    return {
      success: true,
      uid: userRecord.uid,
      email: userRecord.email,
      message: `Admin user created successfully!`,
    };
  } catch (error: any) {
    logger.error("Error creating admin user:", error);
    throw new Error(`Failed to create admin user: ${error.message}`);
  }
});

/**
 * Set role for any user (admin only)
 */
export const setUserRole = onCall(async (request) => {
  const {email, role} = request.data;

  // Only allow if request is from an admin
  if (!request.auth || request.auth.token.role !== "admin") {
    throw new Error("Only admins can set user roles");
  }

  if (!email || !role) {
    throw new Error("Email and role are required");
  }

  const validRoles = ["admin", "school", "parent", "student"];
  if (!validRoles.includes(role)) {
    throw new Error(`Role must be one of: ${validRoles.join(", ")}`);
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(userRecord.uid, {role});

    logger.info(`Role set to ${role} for user:`, userRecord.uid);

    return {
      success: true,
      uid: userRecord.uid,
      email: userRecord.email,
      role,
      message: `Role set to ${role} for ${email}`,
    };
  } catch (error: any) {
    logger.error("Error setting user role:", error);
    throw new Error(`Failed to set user role: ${error.message}`);
  }
});
