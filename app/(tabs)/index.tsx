
import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>SD</Text>
            </View>
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>البيت السوداني</Text>
              <Text style={styles.subtitle}>سوق وخدمات متنوعة</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={() => router.push('/auth')}
            >
              <IconSymbol name="arrow.right.square" size={20} color="#fff" />
              <Text style={styles.logoutText}>تسجيل الخروج</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileIcon}>
              <IconSymbol name="person.fill" size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث في البيت السوداني..."
            placeholderTextColor="#9ca3af"
          />
          <IconSymbol name="magnifyingglass" size={18} color="#9ca3af" style={styles.searchIcon} />
        </View>
      </ThemedView>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>البيت السوداني</Text>
        <Text style={styles.heroSubtitle}>سوق وخدمات ومنتجات السودان في الخليج والعالم</Text>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>المتاجر قريباً</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/auth')}
          >
            <Text style={styles.secondaryButtonText}>عرض المنتجات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tertiaryButton}>
            <Text style={styles.secondaryButtonText}>اكتشف السودان</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <IconSymbol name="house.fill" size={24} color="#fff" />
            <Text style={styles.statNumber}>+100K</Text>
            <Text style={styles.statLabel}>مستخدم نشط</Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="paperplane.fill" size={24} color="#fff" />
            <Text style={styles.statNumber}>+5K</Text>
            <Text style={styles.statLabel}>خدمة مسجلة</Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="chevron.right" size={24} color="#fff" />
            <Text style={styles.statNumber}>+50K</Text>
            <Text style={styles.statLabel}>متجر مشترك</Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="house.fill" size={24} color="#fff" />
            <Text style={styles.statNumber}>+2K</Text>
            <Text style={styles.statLabel}>منتج مختار</Text>
          </View>
        </View>
      </View>

      {/* Services Grid */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>خدماتنا</Text>
        <Text style={styles.sectionSubtitle}>مجموعة متنوعة من الخدمات المتخصصة تخدم المجتمع السوداني في الخليج والعالم</Text>
        
        <View style={styles.servicesGrid}>
          <TouchableOpacity style={[styles.serviceCard, { backgroundColor: '#6366f1' }]}>
            <View style={styles.serviceIcon}>
              <IconSymbol name="house.fill" size={30} color="#fff" />
            </View>
            <Text style={styles.serviceTitle}>السوق التجاري</Text>
            <Text style={styles.serviceDesc}>اكتشف منتجات متنوعة عالية الجودة من موردين موثوقين</Text>
            <TouchableOpacity style={styles.serviceButton}>
              <Text style={styles.serviceButtonText}>اكتشف المزيد</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.serviceCard, { backgroundColor: '#10b981' }]}>
            <View style={styles.serviceIcon}>
              <IconSymbol name="paperplane.fill" size={30} color="#fff" />
            </View>
            <Text style={styles.serviceTitle}>دليل الشركات</Text>
            <Text style={styles.serviceDesc}>تواصل مع الشركات والمؤسسات السودانية في الخليج</Text>
            <TouchableOpacity style={styles.serviceButton}>
              <Text style={styles.serviceButtonText}>اكتشف المزيد</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.serviceCard, { backgroundColor: '#f59e0b' }]}>
            <View style={styles.serviceIcon}>
              <IconSymbol name="house.fill" size={30} color="#fff" />
            </View>
            <Text style={styles.serviceTitle}>الخدمات المهنية</Text>
            <Text style={styles.serviceDesc}>احصل على خدمات مهنية من خبراء مختصين في مختلف المجالات</Text>
            <TouchableOpacity style={styles.serviceButton}>
              <Text style={styles.serviceButtonText}>اكتشف المزيد</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.serviceCard, { backgroundColor: '#8b5cf6' }]}>
            <View style={styles.serviceIcon}>
              <IconSymbol name="chevron.right" size={30} color="#fff" />
            </View>
            <Text style={styles.serviceTitle}>لوحة الوظائف</Text>
            <Text style={styles.serviceDesc}>ابحث عن وظائف أو أعلن عن وظائف شاغرة</Text>
            <TouchableOpacity style={styles.serviceButton}>
              <Text style={styles.serviceButtonText}>اكتشف الوظائف</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.serviceCard, { backgroundColor: '#ef4444' }]}>
            <View style={styles.serviceIcon}>
              <IconSymbol name="house.fill" size={30} color="#fff" />
            </View>
            <Text style={styles.serviceTitle}>إعلانات</Text>
            <Text style={styles.serviceDesc}>تصفح إعلانات ومنتجات المجتمع السوداني</Text>
            <TouchableOpacity style={styles.serviceButton}>
              <Text style={styles.serviceButtonText}>اكتشف المزيد</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.serviceCard, { backgroundColor: '#f97316' }]}>
            <View style={styles.serviceIcon}>
              <IconSymbol name="paperplane.fill" size={30} color="#fff" />
            </View>
            <Text style={styles.serviceTitle}>الخدمات الحكومية</Text>
            <Text style={styles.serviceDesc}>خدمات حكومية مختلفة من جهات معتمدة</Text>
            <TouchableOpacity style={styles.serviceButton}>
              <Text style={styles.serviceButtonText}>اكتشف المزيد</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleSection: {
    alignItems: 'flex-start',
  },
  mainTitle: {
    color: '#1e293b',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  subtitle: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'right',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    textAlign: 'right',
    color: '#1e293b',
  },
  searchIcon: {
    marginLeft: 8,
  },
  heroSection: {
    backgroundColor: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    backgroundColor: '#1e293b',
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 50,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  secondaryButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 4,
    textAlign: 'center',
  },
  servicesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  servicesGrid: {
    gap: 20,
  },
  serviceCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  serviceDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
    marginBottom: 20,
  },
  serviceButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  serviceButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
