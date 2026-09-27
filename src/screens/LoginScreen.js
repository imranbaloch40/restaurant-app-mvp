import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (isLogin) {
        const result = login(email, password);

        if (!result.success) {
          setErrors({
            general: result.message,
          });

          setIsSubmitting(false);
          return;
        }

        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);

        Alert.alert(
          "Signup Successful",
          "Your account has been created. You can now login."
        );

        setIsLogin(true);
        setPassword("");
        setConfirmPassword("");
        setErrors({});
      }
    }, 1000);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {isLogin ? "Welcome Back" : "Create Account"}
        </Text>

        <Text style={styles.subtitle}>
          {isLogin
            ? "Login to your restaurant account"
            : "Sign up to order your favorite food"}
        </Text>

        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />

            {errors.fullName && (
              <Text style={styles.error}>{errors.fullName}</Text>
            )}
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {errors.email && (
          <Text style={styles.error}>{errors.email}</Text>
        )}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
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
          <Text style={styles.error}>{errors.password}</Text>
        )}

        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {errors.confirmPassword && (
              <Text style={styles.error}>
                {errors.confirmPassword}
              </Text>
            )}

            <Text style={styles.roleTitle}>Select Role</Text>

            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === "customer" && styles.selectedRole,
                ]}
                onPress={() => setRole("customer")}
              >
                <Text>Customer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === "manager" && styles.selectedRole,
                ]}
                onPress={() => setRole("manager")}
              >
                <Text>Manager</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {errors.general && (
          <Text style={styles.error}>{errors.general}</Text>
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>
              {isLogin ? "Login" : "Sign Up"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={switchMode}>
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    elevation: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 13,
    marginTop: 12,
    backgroundColor: "#fff",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 12,
  },

  passwordInput: {
    flex: 1,
    padding: 13,
  },

  showText: {
    paddingHorizontal: 12,
    fontWeight: "bold",
  },

  error: {
    color: "red",
    marginTop: 5,
    fontSize: 13,
  },

  roleTitle: {
    marginTop: 18,
    fontWeight: "bold",
  },

  roleContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  roleButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },

  selectedRole: {
    backgroundColor: "#ddd",
  },

  submitButton: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 25,
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  switchText: {
    textAlign: "center",
    marginTop: 18,
    color: "#333",
  },
});