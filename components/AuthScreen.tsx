import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from './ui/IconSymbol';

interface LoginScreenProps {
  onLogin: (username?: string, password?: string) => void;
}

interface RegisterScreenProps {
  onRegister: () => void;
}

const { width, height } = Dimensions.get('window');

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <IconSymbol name="storefront.fill" size={40} color="#fff" />
              </View>
            </View>
            <Text style={styles.appTitle}>القفة السودانية</Text>
            <Text style={styles.appSubtitle}>اكتشف أفضل المتاجر السودانية</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>تسجيل الدخول</Text>
              <Text style={styles.formSubtitle}>أهلاً بك مرة أخرى</Text>
            </View>

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <IconSymbol name="person.fill" size={20} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="اسم المستخدم أو البريد الإلكتروني"
                  placeholderTextColor="#9ca3af"
                  value={username}
                  onChangeText={setUsername}
                  textAlign="right"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <IconSymbol name="lock.fill" size={20} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="كلمة المرور"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  textAlign="right"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <IconSymbol
                    name={showPassword ? "eye.slash.fill" : "eye.fill"}
                    size={18}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.rememberMeContainer}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <IconSymbol name="checkmark" size={12} color="#fff" />}
                </View>
                <Text style={styles.rememberText}>تذكرني</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotText}>نسيت كلمة المرور؟</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
                <IconSymbol name="arrow.right" size={16} color="#fff" style={styles.buttonIcon} />
              </LinearGradient>
            </TouchableOpacity>

            {/* Quick Login Options */}
            <View style={styles.quickLoginSection}>
              <Text style={styles.quickLoginTitle}>تسجيل دخول سريع</Text>
              <View style={styles.quickLoginButtons}>
                <TouchableOpacity
                  style={styles.quickLoginButton}
                  onPress={() => onLogin('admin', '123456')}
                >
                  <IconSymbol name="shield.fill" size={18} color="#3b82f6" />
                  <Text style={styles.quickLoginText}>مدير</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.quickLoginButton}
                  onPress={() => onLogin('merchant', 'merchant')}
                >
                  <IconSymbol name="storefront.fill" size={18} color="#8b5cf6" />
                  <Text style={styles.quickLoginText}>تاجر</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.quickLoginButton}
                  onPress={() => onLogin('user', 'user')}
                >
                  <IconSymbol name="person.fill" size={18} color="#10b981" />
                  <Text style={styles.quickLoginText}>مستخدم</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>أو</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Register Link */}
            <View style={styles.registerSection}>
              <Text style={styles.registerPrompt}>ليس لديك حساب؟</Text>
              <TouchableOpacity>
                <Text style={styles.registerLink}>إنشاء حساب جديد</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

export function RegisterScreen({ onRegister }: RegisterScreenProps) {
  const [userType, setUserType] = useState<'customer' | 'merchant'>('customer');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <IconSymbol name="person.badge.plus.fill" size={40} color="#fff" />
              </View>
            </View>
            <Text style={styles.appTitle}>إنشاء حساب جديد</Text>
            <Text style={styles.appSubtitle}>انضم إلى مجتمع القفة السودانية</Text>
          </View>

          {/* Register Form */}
          <View style={styles.formContainer}>
            {/* User Type Selection */}
            <View style={styles.userTypeSection}>
              <Text style={styles.userTypeTitle}>نوع الحساب</Text>
              <View style={styles.userTypeButtons}>
                <TouchableOpacity
                  style={[styles.userTypeButton, userType === 'customer' && styles.userTypeButtonActive]}
                  onPress={() => setUserType('customer')}
                >
                  <IconSymbol
                    name="person.fill"
                    size={24}
                    color={userType === 'customer' ? '#fff' : '#6b7280'}
                  />
                  <Text style={[styles.userTypeText, userType === 'customer' && styles.userTypeTextActive]}>
                    مستخدم
                  </Text>
                  <Text style={styles.userTypeDesc}>للتسوق والشراء</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.userTypeButton, userType === 'merchant' && styles.userTypeButtonActive]}
                  onPress={() => setUserType('merchant')}
                >
                  <IconSymbol
                    name="storefront.fill"
                    size={24}
                    color={userType === 'merchant' ? '#fff' : '#6b7280'}
                  />
                  <Text style={[styles.userTypeText, userType === 'merchant' && styles.userTypeTextActive]}>
                    صاحب عمل
                  </Text>
                  <Text style={styles.userTypeDesc}>لإنشاء متجر وبيع المنتجات</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Fields */}
            <View style={styles.formFields}>
              {/* Full Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>الاسم الكامل *</Text>
                <View style={styles.inputWrapper}>
                  <IconSymbol name="person.fill" size={18} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="أدخل الاسم الكامل"
                    placeholderTextColor="#9ca3af"
                    value={formData.fullName}
                    onChangeText={(text) => setFormData({...formData, fullName: text})}
                    textAlign="right"
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>البريد الإلكتروني *</Text>
                <View style={styles.inputWrapper}>
                  <IconSymbol name="envelope.fill" size={18} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="example@email.com"
                    placeholderTextColor="#9ca3af"
                    value={formData.email}
                    onChangeText={(text) => setFormData({...formData, email: text})}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textAlign="left"
                  />
                </View>
              </View>

              {/* Phone */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>رقم الهاتف *</Text>
                <View style={styles.inputWrapper}>
                  <IconSymbol name="phone.fill" size={18} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="+966 50 123 4567"
                    placeholderTextColor="#9ca3af"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({...formData, phone: text})}
                    keyboardType="phone-pad"
                    textAlign="left"
                  />
                </View>
              </View>

              {/* Country */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>الدولة</Text>
                <View style={styles.inputWrapper}>
                  <IconSymbol name="globe" size={18} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="المملكة العربية السعودية"
                    placeholderTextColor="#9ca3af"
                    value={formData.country}
                    onChangeText={(text) => setFormData({...formData, country: text})}
                    textAlign="right"
                  />
                  <IconSymbol name="chevron.down" size={16} color="#9ca3af" style={styles.dropdownIcon} />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>كلمة المرور *</Text>
                <View style={styles.inputWrapper}>
                  <IconSymbol name="lock.fill" size={18} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="أدخل كلمة مرور قوية"
                    placeholderTextColor="#9ca3af"
                    value={formData.password}
                    onChangeText={(text) => setFormData({...formData, password: text})}
                    secureTextEntry={!showPassword}
                    textAlign="right"
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <IconSymbol
                      name={showPassword ? "eye.slash.fill" : "eye.fill"}
                      size={16}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>تأكيد كلمة المرور *</Text>
                <View style={styles.inputWrapper}>
                  <IconSymbol name="lock.fill" size={18} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="أعد كتابة كلمة المرور"
                    placeholderTextColor="#9ca3af"
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                    secureTextEntry={!showConfirmPassword}
                    textAlign="right"
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <IconSymbol
                      name={showConfirmPassword ? "eye.slash.fill" : "eye.fill"}
                      size={16}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Terms Agreement */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setAgreeTerms(!agreeTerms)}
            >
              <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
                {agreeTerms && <IconSymbol name="checkmark" size={12} color="#fff" />}
              </View>
              <Text style={styles.termsText}>
                أوافق على <Text style={styles.termsLink}>شروط الاستخدام</Text> و <Text style={styles.termsLink}>سياسة الخصوصية</Text>
              </Text>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity
              style={[styles.loginButton, !agreeTerms && styles.disabledButton]}
              onPress={onRegister}
              disabled={!agreeTerms}
            >
              <LinearGradient
                colors={agreeTerms ? ['#8b5cf6', '#7c3aed'] : ['#9ca3af', '#6b7280']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginButtonText}>إنشاء الحساب</Text>
                <IconSymbol name="arrow.right" size={16} color="#fff" style={styles.buttonIcon} />
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.registerSection}>
              <Text style={styles.registerPrompt}>لديك حساب بالفعل؟</Text>
              <TouchableOpacity>
                <Text style={styles.registerLink}>تسجيل الدخول</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'right',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  eyeIcon: {
    padding: 4,
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  rememberText: {
    fontSize: 14,
    color: '#6b7280',
  },
  forgotPassword: {
    padding: 4,
  },
  forgotText: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  buttonIcon: {
    transform: [{ rotate: '180deg' }],
  },
  quickLoginSection: {
    marginBottom: 24,
  },
  quickLoginTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  quickLoginButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickLoginButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    minWidth: 80,
  },
  quickLoginText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: 14,
    color: '#9ca3af',
    paddingHorizontal: 16,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerPrompt: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  registerLink: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  userTypeSection: {
    marginBottom: 24,
  },
  userTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  userTypeButtonActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  userTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 4,
  },
  userTypeTextActive: {
    color: '#fff',
  },
  userTypeDesc: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
  formFields: {
    marginBottom: 24,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  termsText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    textAlign: 'right',
    flex: 1,
  },
  termsLink: {
    color: '#8b5cf6',
    fontWeight: '500',
  },
});