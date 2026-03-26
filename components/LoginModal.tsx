import React, { useRef } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { pollQRCode } from "../services/api";
import { useAuthStore } from "../store/authStore";
import { useTheme } from "../utils/theme";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function LoginModal({ visible, onClose }: Props) {
  const login = useAuthStore((s) => s.login);
  const theme = useTheme();

  const slideY = useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    } else {
      slideY.setValue(300);
    }
  }, [visible]);

  async function handleLogin() {
    const result = await pollQRCode('mock-key');
    if (result.code === 0 && result.cookie) {
      await login(result.cookie, '', '');
      onClose();
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay} pointerEvents="box-none" />

      <Animated.View
        style={[styles.sheetWrapper, { transform: [{ translateY: slideY }] }]}
      >
        <View style={[styles.sheet, { backgroundColor: theme.sheetBg }]}>
          <Text style={[styles.title, { color: theme.modalText }]}>登录</Text>

          <View style={styles.iconWrap}>
            <Ionicons name="person-circle-outline" size={72} color="#00AEEC" />
          </View>

          <Text style={[styles.hint, { color: theme.modalTextSub }]}>
            演示模式：点击下方按钮一键登录
          </Text>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.loginBtnText}>一键登录</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={[styles.closeTxt, { color: "#00AEEC" }]}>关闭</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheetWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 20 },
  iconWrap: { marginBottom: 16 },
  hint: { fontSize: 13, marginBottom: 24, textAlign: "center" },
  loginBtn: {
    backgroundColor: "#00AEEC",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 48,
    marginBottom: 8,
  },
  loginBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  closeBtn: { padding: 12 },
  closeTxt: { fontSize: 14 },
});
