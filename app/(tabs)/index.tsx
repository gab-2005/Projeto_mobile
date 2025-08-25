import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Settings, Map, LogIn, UserPlus } from "lucide-react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>UNISUAM</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Settings color="#FF6600" size={28} />
        </TouchableOpacity>
      </View>

      {/* Conteúdo central */}
      <View style={styles.content}>
        <Text style={styles.welcome}>Bem-vindo ao mapa da UNISUAM</Text>
        <Text style={styles.subtitle}>
          Use o menu abaixo para navegar entre as opções
        </Text>
      </View>

      {/* Menu de navegação inferior */}
      <View style={styles.bottomMenu}>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <LogIn color="#FF6600" size={24} />
            <Text style={styles.menuText}>Login</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/cadastro_login" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <UserPlus color="#FF6600" size={24} />
            <Text style={styles.menuText}>Cadastro</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/mapa" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Map color="#FF6600" size={24} />
            <Text style={styles.menuText}>Mapa</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Modal de Configurações */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurações</Text>

            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalText}>Alterar tema</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalText}>Preferências</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, { marginTop: 20 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalText, { color: "red" }]}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    marginTop: 4,
    fontSize: 12,
    color: "#FF6600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FF6600",
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
  },
});
