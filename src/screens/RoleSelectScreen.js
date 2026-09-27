import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import users from "../data/users";

export default function LoginScreen({ navigation }) {
  const [mode, setMode] = useState("login");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearError = (field) => {
    setErrors((oldErrors) => {
      const newErrors = { ...oldErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*\d).{8,}$/.test(password)) {
      newErrors.password =
        "Password must be 8 characters and contain a digit";
    }

    if (mode === "signup") {
      if (!fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (mode === "login") {
        const user = users.find(
          (item) =>
            item.email.toLowerCase() === email.trim().toLowerCase() &&
            item.password === password
        );

        setIsSubmitting(false);

        if (!user) {
          Alert.alert(
            "Login Failed",
            "Incorrect email or password."
          );
          return;
        }

        if (user.role === "manager") {
          navigation.replace("ManagerDashboard");
        } else {
          navigation.replace("Menu");
        }
      } else {
        const existingUser = users.find(
          (item) =>
            item.email.toLowerCase() === email.trim().toLowerCase()
        );

        setIsSubmitting(false);

        if (existingUser) {
          Alert.alert(
            "Signup Failed",
            "This email is already registered."
          );
          return;
        }

        Alert.alert(
          "Signup Successful",
          `Welcome ${fullName}!`,
          [
            {
              text: "OK",
              onPress: () => {
                setMode("login");
                setFullName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setErrors({});
              },
            },
          ]
        );
      }
    }, 1000);
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErrors({});
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>

          <Text style={styles.logo}>🍽️</Text>

          <Text style={styles.title}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </Text>

          <Text style={styles.subtitle}>
            {mode === "login"
              ? "Login to continue"
              : "Create your restaurant account"}
          </Text>

          {mode === "signup" && (
            <>
              <Text style={styles.label}>Full Name</Text>

              <TextInput
                style={[
                  styles.input,
                  errors.fullName && styles.errorInput,
                ]}
                placeholder="Enter full name"
                value={fullName}
                onChangeText={(value) => {
                  setFullName(value);
                  clearError("fullName");
                }}
              />

              {errors.fullName && (
                <Text style={styles.error}>
                  {errors.fullName}
                </Text>
              )}
            </>
          )}

          <Text style={styles.label}>Email</Text>

          <TextInput
            style={[
              styles.input,
              errors.email && styles.errorInput,
            ]}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              clearError("email");
            }}
          />

          {errors.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}

          <Text style={styles.label}>Password</Text>

          <View
            style={[
              styles.passwordBox,
              errors.password && styles.errorInput,
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                clearError("password");
              }}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showText}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

          {errors.password && (
            <Text style={styles.error}>
              {errors.password}
            </Text>
          )}

          {mode === "signup" && (
            <>
              <Text style={styles.label}>Confirm Password</Text>

              <TextInput
                style={[
                  styles.input,
                  errors.confirmPassword && styles.errorInput,
                ]}
                placeholder="Confirm password"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={(value) => {
                  setConfirmPassword(value);
                  clearError("confirmPassword");
                }}
              />

              {errors.confirmPassword && (
                <Text style={styles.error}>
                  {errors.confirmPassword}
                </Text>
              )}

              <Text style={styles.label}>Role</Text>

              <View style={styles.roleRow}>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    role === "customer" && styles.selectedRole,
                  ]}
                  onPress={() => setRole("customer")}
                >
                  <Text
                    style={[
                      styles.roleText,
                      role === "customer" &&
                        styles.selectedRoleText,
                    ]}
                  >
                    Customer
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    role === "manager" && styles.selectedRole,
                  ]}
                  onPress={() => setRole("manager")}
                >
                  <Text
                    style={[
                      styles.roleText,
                      role === "manager" &&
                        styles.selectedRoleText,
                    ]}
                  >
                    Manager
                  </Text>
                </TouchableOpacity>

              </View>
            </>
          )}

          <TouchableOpacity
            style={[
              styles.loginButton,
              isSubmitting && styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>
                {mode === "login"
                  ? "Login"
                  : "Create Account"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={switchMode}
            disabled={isSubmitting}
          >
            <Text style={styles.switchText}>
              {mode === "login"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F0",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },

  logo: {
    fontSize: 50,
    textAlign: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222222",
  },

  subtitle: {
    textAlign: "center",
    color: "#777777",
    marginTop: 8,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: "#333333",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FAFAFA",
  },

  passwordBox: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    backgroundColor: "#FAFAFA",
  },

  passwordInput: {
    flex: 1,
  },

  showText: {
    color: "#C8873E",
    fontWeight: "bold",
    paddingHorizontal: 14,
  },

  errorInput: {
    borderColor: "#D9534F",
  },

  error: {
    color: "#D9534F",
    fontSize: 12,
    marginTop: 4,
  },

  roleRow: {
    flexDirection: "row",
    gap: 10,
  },

  roleButton: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedRole: {
    backgroundColor: "#C8873E",
    borderColor: "#C8873E",
  },

  roleText: {
    fontWeight: "600",
    color: "#555555",
  },

  selectedRoleText: {
    color: "#FFFFFF",
  },

  loginButton: {
    height: 52,
    backgroundColor: "#C8873E",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 18,
  },

  disabledButton: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  switchText: {
    textAlign: "center",
    color: "#C8873E",
    fontWeight: "600",
  },
});