
import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.welcomeText}>مرحباً بك في البيت السوداني</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <IconSymbol name="house.fill" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="البحث في البيت السوداني..."
            placeholderTextColor="#999"
          />
          <IconSymbol name="chevron.right" size={20} color="#666" style={styles.searchIcon} />
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
          <TouchableOpacity style={styles.secondaryButton}>
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
    backgroundColor: '#1e293b',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    textAlign: 'right',
  },
  searchIcon: {
    marginLeft: 10,
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
