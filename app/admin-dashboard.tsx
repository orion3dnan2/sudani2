
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

export default function AdminDashboard() {
  const stats = [
    { id: 1, title: 'إجمالي المستخدمين', value: '1,247', icon: 'house.fill', color: '#3b82f6' },
    { id: 2, title: 'إجمال المتاجر', value: '89', icon: 'paperplane.fill', color: '#10b981' },
    { id: 3, title: 'إجمال الطلبات', value: '3,456', icon: 'chevron.right', color: '#8b5cf6' },
    { id: 4, title: 'الإيرادات الشهرية', value: '125,170 ج.س', icon: 'house.fill', color: '#f59e0b' },
  ];

  const quickActions = [
    { id: 1, title: 'إدارة المتاجر', subtitle: 'مراجعة واعتماد المتاجر الجديدة', icon: 'paperplane.fill', color: '#ef4444', action: 'stores' },
    { id: 2, title: 'إدارة المستخدمين', subtitle: 'حماية وتعديل حقوق المستخدمين والتطبيقات', icon: 'house.fill', color: '#10b981', action: 'users' },
    { id: 3, title: 'إعدادات التطبيق', subtitle: 'إدارة الإعدادات العامة والتخصيصات الأساسية', icon: 'chevron.right', color: '#3b82f6', action: 'settings' },
    { id: 4, title: 'إدارة المحتوى', subtitle: 'إدارة الصفحات والمحتوى والتصنيفات المختلفة', icon: 'house.fill', color: '#f97316', action: 'content' },
    { id: 5, title: 'إعدادات الطلبات', subtitle: 'إعدادات الأسعار والرسوم والجولات المختلفة', icon: 'paperplane.fill', color: '#ef4444', action: 'orders' },
    { id: 6, title: 'التطوير والتقييمات', subtitle: 'تحسين أراء وتقييمات المنتجات', icon: 'chevron.right', color: '#ec4899', action: 'reviews' },
  ];

  const recentActivities = [
    { id: 1, action: 'تسجيل متجر جديد', details: 'بواسطة أحمد محمد منذ 15 دقيقة', icon: 'house.fill' },
    { id: 2, action: 'طلب اعتماد متجر', details: 'بواسطة محمد علي منذ 30 دقيقة', icon: 'paperplane.fill' },
    { id: 3, action: 'مراجعة منتج', details: 'بواسطة فاطمة أحمد منذ ساعة واحدة', icon: 'house.fill' },
    { id: 4, action: 'طلب دعم فني', details: 'بواسطة محمد أحمد منذ ساعتين', icon: 'chevron.right' },
  ];

  const handleLogout = () => {
    router.replace('/auth');
  };

  const handleGoHome = () => {
    router.replace('/(tabs)');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'stores':
        router.push('/admin-stores');
        break;
      case 'users':
        alert('إدارة المستخدمين - قيد التطوير');
        break;
      case 'settings':
        alert('إعدادات التطبيق - قيد التطوير');
        break;
      case 'content':
        alert('إدارة المحتوى - قيد التطوير');
        break;
      case 'orders':
        alert('إعدادات الطلبات - قيد التطوير');
        break;
      case 'reviews':
        alert('التطوير والتقييمات - قيد التطوير');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>مرحباً بك</Text>
            <Text style={styles.adminTitle}>لوحة التحكم الإدارية</Text>
            <Text style={styles.subtitle}>أهلاً وسهلاً عمر التطبيق</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={handleGoHome}>
            <IconSymbol name="house.fill" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* إحصائيات سريعة */}
      <View style={styles.statsContainer}>
        {stats.map((stat) => (
          <View key={stat.id} style={[styles.statCard, { borderLeftColor: stat.color }]}>
            <View style={styles.statContent}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <IconSymbol name={stat.icon} size={24} color={stat.color} />
              </View>
              <View style={styles.statText}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* الإجراءات السريعة */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ الإجراءات السريعة</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity 
              key={action.id} 
              style={styles.actionCard}
              onPress={() => handleQuickAction(action.action)}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <IconSymbol name={action.icon} size={20} color="#fff" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* الأنشطة الحديثة */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 الأنشطة الحديثة</Text>
        <View style={styles.activitiesContainer}>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <IconSymbol name={activity.icon} size={16} color="#3b82f6" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text style={styles.activityDetails}>{activity.details}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.viewMoreContainer}>
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>عرض التقارير التفصيلية</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>عرض جميع الأنشطة</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#bfdbfe',
    fontSize: 14,
    marginBottom: 4,
  },
  adminTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#bfdbfe',
    fontSize: 14,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statText: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  actionsGrid: {
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
  activitiesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
    textAlign: 'right',
  },
  activityDetails: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
  viewMoreContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  viewMoreButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  viewAllButton: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  viewAllText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '600',
  },
});
