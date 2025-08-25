import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TextInput,
  ScrollView,
  Easing,
} from "react-native";
import { LogIn, UserPlus } from "lucide-react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");
const NAVBAR_HEIGHT = 120;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [activeForm, setActiveForm] = useState<"login" | "cadastro" | null>(null);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    senha: "",
    repetirSenha: "",
  });

  const [login, setLogin] = useState({ email: "", senha: "" });

  // Animated height
  const panelHeight = useRef(new Animated.Value(NAVBAR_HEIGHT)).current;

  // Animated scale para diferenciar ativo/inativo
  const loginScale = useRef(new Animated.Value(1)).current;
  const cadastroScale = useRef(new Animated.Value(1)).current;

  const openForm = (type: "login" | "cadastro") => {
    setActiveForm(type);
    Animated.parallel([
      Animated.timing(panelHeight, {
        toValue: height - insets.top - insets.bottom - 20,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
      Animated.timing(loginScale, {
        toValue: type === "login" ? 0 : 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(cadastroScale, {
        toValue: type === "cadastro" ? 0 :  0.5,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

const closeForm = () => {
  Animated.timing(panelHeight, {
    toValue: NAVBAR_HEIGHT,
    duration: 600,
    easing: Easing.out(Easing.exp),
    useNativeDriver: false,
  }).start(() => {
    setActiveForm(null);
    // ❌ Não reseta step nem os dados aqui
  });
};

  const nextStep = () => step < 3 && setStep(step + 1);

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      closeForm();
    }
  };

  const handleChange = (key: string, value: string) => setForm({ ...form, [key]: value });
  const handleSubmitCadastro = () => { console.log("Cadastro enviado:", form); closeForm(); };
  const handleSubmitLogin = () => { console.log("Login enviado:", login); closeForm(); };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar/painel animado */}
      <Animated.View style={[styles.panel, { height: panelHeight }]}>
        {/* Ícones sempre visíveis */}
        <View style={styles.menu}>
          <Animated.View style={{ transform: [{ scale: loginScale }] }}>
            <TouchableOpacity onPress={() => openForm("login")} style={styles.menuItem}>
              <LogIn color="#FF6600" size={28} />
              <Text style={styles.menuText}>login</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: cadastroScale }] }}>
            <TouchableOpacity onPress={() => openForm("cadastro")} style={styles.menuItem}>
              <UserPlus color="#FF6600" size={28} />
              <Text style={styles.menuText}>Cadastro</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Formulário */}
        {activeForm && (
          <ScrollView contentContainerStyle={styles.formContent}>
            {activeForm === "login" && (
              <View>
                <Text style={styles.formTitle}></Text>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={login.email}
                  onChangeText={(text) => setLogin({ ...login, email: text })}
                />
                <TextInput
                  placeholder="Senha"
                  secureTextEntry
                  style={styles.input}
                  value={login.senha}
                  onChangeText={(text) => setLogin({ ...login, senha: text })}
                />
                <View style={styles.buttonsRow}>
                  <TouchableOpacity style={styles.navButton} onPress={prevStep}>
                    <Text style={styles.navButtonText}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navButton} onPress={handleSubmitLogin}>
                    <Text style={styles.navButtonText}>Entrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {activeForm === "cadastro" && (
              <View>
                {/* Indicador de passos */}
                <View style={styles.steps}>
                  {[1, 2, 3].map((s) => (
                    <View
                      key={s}
                      style={[
                        styles.stepDot,
                        step === s ? styles.activeDot : styles.inactiveDot,
                      ]}
                    />
                  ))}
                </View>

                {step === 1 && (
                  <>
                    <TextInput placeholder="Nome" style={styles.input} value={form.nome} onChangeText={(text) => handleChange("nome", text)} />
                    <TextInput placeholder="Sobrenome" style={styles.input} value={form.sobrenome} onChangeText={(text) => handleChange("sobrenome", text)} />
                  </>
                )}
                {step === 2 && (
                  <>
                    <TextInput placeholder="Email" style={styles.input} value={form.email} onChangeText={(text) => handleChange("email", text)} />
                    <TextInput placeholder="Telefone" style={styles.input} value={form.telefone} onChangeText={(text) => handleChange("telefone", text)} />
                  </>
                )}
                {step === 3 && (
                  <>
                    <TextInput placeholder="Senha" secureTextEntry style={styles.input} value={form.senha} onChangeText={(text) => handleChange("senha", text)} />
                    <TextInput placeholder="Repetir Senha" secureTextEntry style={styles.input} value={form.repetirSenha} onChangeText={(text) => handleChange("repetirSenha", text)} />
                  </>
                )}
                <View style={styles.buttonsRow}>
                  <TouchableOpacity style={styles.navButton} onPress={prevStep}>
                    <Text style={styles.navButtonText}>Voltar</Text>
                  </TouchableOpacity>
                  {step < 3 ? (
                    <TouchableOpacity style={styles.navButton} onPress={nextStep}>
                      <Text style={styles.navButtonText}>Próximo</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.navButton} onPress={handleSubmitCadastro}>
                      <Text style={styles.navButtonText}>Cadastrar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </ScrollView>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  panel: {
    position: "absolute",
    left: 5,
    right: 5,
    bottom: 0,
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
  },
  menu: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: 10 },
  menuItem: { alignItems: "center" },
  menuText: { color: "#FF6600", marginTop: 4, fontSize: 14 },
  formContent: { padding: 20, paddingBottom: 40 },
  formTitle: { fontSize: 22, fontWeight: "bold", color: "#FF6600", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginVertical: 8, fontSize: 16, borderWidth: 1, borderColor: "#ccc" },
  buttonsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  navButton: { backgroundColor: "#FF6600", padding: 12, borderRadius: 8, flex: 1, marginHorizontal: 5 },
  navButtonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  steps: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  stepDot: { width: 12, height: 12, borderRadius: 6, marginHorizontal: 5 },
  activeDot: { backgroundColor: "#FF6600" },
  inactiveDot: { backgroundColor: "#ccc" },
});
