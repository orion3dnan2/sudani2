
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function WelcomeScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;

  const welcomeSteps = [
    {
      id: 1,
      title: 'مرحباً بك في السوق المحلي',
      subtitle: 'اكتشف أفضل المتاجر والمنتجات في مدينتك',
      icon: 'storefront.fill',
      color: '#3b82f6',
      description: 'منصة شاملة تربطك بالتجار المحليين وتوفر لك تجربة تسوق فريدة'
    },
    {
      id: 2,
      title: 'تسوق من متاجر محلية',
      subtitle: 'ادعم الاقتصاد المحلي واحصل على منتجات عالية الجودة',
      icon: 'house.fill',
      color: '#10b981',
      description: 'تصفح مئات المتاجر المحلية واختر من بين آلاف المنتجات المتنوعة'
    },
    {
      id: 3,
      title: 'توصيل سريع وآمن',
      subtitle: 'احصل على طلباتك في أسرع وقت ممكن',
      icon: 'paperplane.fill',
      color: '#8b5cf6',
      description: 'خدمة توصيل موثوقة تضمن وصول طلباتك بأمان وفي الوقت المحدد'
    },
    {
      id: 4,
      title: 'ابدأ رحلتك الآن',
      subtitle: 'انضم إلى آلاف العملاء الراضين',
      icon: 'star.fill',
      color: '#f59e0b',
      description: 'سجل الآن واستمتع بتجربة تسوق لا تُنسى مع عروض وخصومات حصرية'
    }
  ];

  useEffect(() => {
    startAnimations();
  }, [currentStep]);

  useEffect(() => {
    // تشغيل أنيميشن دوران الشعار
    const logoRotation = Animated.loop(
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );
    logoRotation.start();

    return () => logoRotation.stop();
  }, []);

  const startAnimations = () => {
    // إعادة تعيين الأنيميشنز
    fadeAnim.setValue(0);
    slideAnim.setValue(screenWidth);
    scaleAnim.setValue(0);

    // تشغيل الأنيميشنز بالتتابع
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGetStarted();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    router.replace('/auth');
  };

  const handleGetStarted = () => {
    router.replace('/auth');
  };

  const currentWelcome = welcomeSteps[currentStep];
  
  const logoRotate = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>تخطي</Text>
          </TouchableOpacity>
          
          <Animated.View 
            style={[
              styles.logoContainer,
              { transform: [{ rotate: logoRotate }] }
            ]}
          >
            <IconSymbol name="storefront.fill" size={32} color="#fff" />
          </Animated.View>
        </View>

        {/* Main Content */}
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.welcomeCard,
              {
                opacity: fadeAnim,
                transform: [
                  { translateX: slideAnim },
                  { scale: scaleAnim }
                ],
              },
            ]}
          >
            {/* Icon Section */}
            <View style={styles.iconSection}>
              <LinearGradient
                colors={[`${currentWelcome.color}20`, `${currentWelcome.color}40`]}
                style={styles.iconBackground}
              >
                <IconSymbol 
                  name={currentWelcome.icon} 
                  size={64} 
                  color={currentWelcome.color} 
                />
              </LinearGradient>
            </View>

            {/* Text Content */}
            <View style={styles.textContent}>
              <Text style={styles.welcomeTitle}>{currentWelcome.title}</Text>
              <Text style={styles.welcomeSubtitle}>{currentWelcome.subtitle}</Text>
              <Text style={styles.welcomeDescription}>{currentWelcome.description}</Text>
            </View>

            {/* Features List */}
            <View style={styles.featuresList}>
              {currentStep === 0 && (
                <>
                  <View style={styles.featureItem}>
                    <IconSymbol name="checkmark.circle.fill" size={20} color="#10b981" />
                    <Text style={styles.featureText}>أكثر من 150 متجر محلي</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="checkmark.circle.fill" size={20} color="#10b981" />
                    <Text style={styles.featureText}>توصيل مجاني للطلبات فوق 100 ريال</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="checkmark.circle.fill" size={20} color="#10b981" />
                    <Text style={styles.featureText}>خدمة عملاء 24/7</Text>
                  </View>
                </>
              )}
              
              {currentStep === 1 && (
                <>
                  <View style={styles.featureItem}>
                    <IconSymbol name="star.fill" size={20} color="#f59e0b" />
                    <Text style={styles.featureText}>منتجات طازجة يومياً</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="star.fill" size={20} color="#f59e0b" />
                    <Text style={styles.featureText}>أسعار تنافسية</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="star.fill" size={20} color="#f59e0b" />
                    <Text style={styles.featureText}>جودة مضمونة 100%</Text>
                  </View>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <View style={styles.featureItem}>
                    <IconSymbol name="clock.fill" size={20} color="#8b5cf6" />
                    <Text style={styles.featureText}>توصيل في نفس اليوم</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="clock.fill" size={20} color="#8b5cf6" />
                    <Text style={styles.featureText}>تتبع الطلب لحظة بلحظة</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="clock.fill" size={20} color="#8b5cf6" />
                    <Text style={styles.featureText}>ضمان الإرجاع والاستبدال</Text>
                  </View>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <View style={styles.featureItem}>
                    <IconSymbol name="gift.fill" size={20} color="#ef4444" />
                    <Text style={styles.featureText}>خصومات حصرية للأعضاء الجدد</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="gift.fill" size={20} color="#ef4444" />
                    <Text style={styles.featureText}>برنامج نقاط المكافآت</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="gift.fill" size={20} color="#ef4444" />
                    <Text style={styles.featureText}>عروض أسبوعية مميزة</Text>
                  </View>
                </>
              )}
            </View>
          </Animated.View>
        </ScrollView>

        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {welcomeSteps.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive,
                { backgroundColor: index === currentStep ? currentWelcome.color : 'rgba(255,255,255,0.3)' }
              ]}
              onPress={() => setCurrentStep(index)}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.navButton, styles.previousButton]}
            onPress={handlePrevious}
            disabled={currentStep === 0}
          >
            <IconSymbol name="chevron.left" size={20} color={currentStep === 0 ? '#9ca3af' : '#fff'} />
            <Text style={[styles.navButtonText, currentStep === 0 && styles.navButtonTextDisabled]}>
              السابق
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton, { backgroundColor: currentWelcome.color }]}
            onPress={handleNext}
          >
            <Text style={styles.navButtonText}>
              {currentStep === welcomeSteps.length - 1 ? 'ابدأ الآن' : 'التالي'}
            </Text>
            <IconSymbol name="chevron.right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5000+</Text>
            <Text style={styles.statLabel}>عميل راضي</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>150+</Text>
            <Text style={styles.statLabel}>متجر محلي</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8⭐</Text>
            <Text style={styles.statLabel}>تقييم التطبيق</Text>
          </View>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
  },
  skipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 20,
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  welcomeDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressDotActive: {
    width: 32,
    height: 12,
    borderRadius: 6,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 16,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  previousButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  nextButton: {
    backgroundColor: '#3b82f6',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  navButtonTextDisabled: {
    color: '#9ca3af',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
