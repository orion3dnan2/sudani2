
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface StoreSubscription {
  id: number;
  storeName: string;
  owner: string;
  plan: 'basic' | 'premium' | 'vip';
  features: {
    allowSelling: boolean;
    allowAdvertising: boolean;
    allowReviews: boolean;
    maxProductsCount: boolean;
    allowSubscription: boolean;
  };
}

export default function AdminSubscriptions() {
  const [stores, setStores] = useState<StoreSubscription[]>([
    {
      id: 1,
      storeName: 'متجر الخرطوم السوداني',
      owner: 'أحمد محمد',
      plan: 'premium',
      features: {
        allowSelling: true,
        allowAdvertising: true,
        allowReviews: true,
        maxProductsCount: true,
        allowSubscription: true,
      },
    },
    {
      id: 2,
      storeName: 'العطور السودانية الأصيلة',
      owner: 'فاطمة عبدالله',
      plan: 'basic',
      features: {
        allowSelling: true,
        allowAdvertising: false,
        allowReviews: false,
        maxProductsCount: false,
        allowSubscription: false,
      },
    },
  ]);

  const stats = [
    { 
      id: 1, 
      title: 'متاجر الطعام', 
      value: '2', 
      icon: 'exclamationmark.triangle.fill', 
      color: '#ef4444', 
      bgColor: '#fef2f2',
      alert: true 
    },
    { 
      id: 2, 
      title: 'إجمالي الإيرادات', 
      value: '$74,720', 
      icon: 'dollarsign.square.fill', 
      color: '#10b981', 
      bgColor: '#ecfdf5' 
    },
    { 
      id: 3, 
      title: 'متاجر موثقة', 
      value: '2', 
      icon: 'shield.checkered', 
      color: '#3b82f6', 
      bgColor: '#eff6ff' 
    },
    { 
      id: 4, 
      title: 'متاجر معتمدة', 
      value: '1', 
      icon: 'crown.fill', 
      color: '#8b5cf6', 
      bgColor: '#f3e8ff' 
    },
    { 
      id: 5, 
      title: 'متاجر مطبقة', 
      value: '1', 
      icon: 'checkmark.circle.fill', 
      color: '#10b981', 
      bgColor: '#ecfdf5' 
    },
    { 
      id: 6, 
      title: 'إجمالي المتاجر', 
      value: '4', 
      icon: 'building.2.fill', 
      color: '#06b6d4', 
      bgColor: '#ecfeff' 
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'basic':
        return '#6b7280';
      case 'premium':
        return '#f59e0b';
      case 'vip':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const getPlanText = (plan: string) => {
    switch (plan) {
      case 'basic':
        return 'أساسي';
      case 'premium':
        return 'مميز';
      case 'vip':
        return 'في آي بي';
      default:
        return plan;
    }
  };

  const handleFeatureToggle = (storeId: number, feature: keyof StoreSubscription['features']) => {
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        return {
          ...store,
          features: {
            ...store.features,
            [feature]: !store.features[feature]
          }
        };
      }
      return store;
    });
    setStores(updatedStores);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'manage':
        router.push('/admin-stores-advanced');
        break;
      case 'subscriptions':
        Alert.alert('الاشتراكات والقيود', 'أنت في شاشة الاشتراكات والقيود حالياً');
        break;
      case 'support':
        router.push('/admin-support');
        break;
      case 'orders':
        router.push('/admin-orders');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.right" size={20} color="#fff" />
            <Text style={styles.backText}>العودة</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>إدارة المتاجر المتقدمة</Text>
          <Text style={styles.headerSubtitle}>التحكم الكامل ومراقبة لصحاب المتاجر إضافة المتاجر</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.exportButton} onPress={() => Alert.alert('تصدير', 'قيد التطوير')}>
            <IconSymbol name="square.and.arrow.down.fill" size={16} color="#fff" />
            <Text style={styles.exportText}>تصدير البيانات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton} onPress={() => Alert.alert('الإعدادات', 'قيد التطوير')}>
            <IconSymbol name="gearshape.fill" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat) => (
          <View key={stat.id} style={[styles.statCard, { backgroundColor: stat.bgColor }]}>
            <View style={styles.statHeader}>
              <View style={styles.statIconContainer}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <IconSymbol name={stat.icon} size={20} color={stat.color} />
                </View>
                {stat.alert && (
                  <View style={styles.alertBadge}>
                    <IconSymbol name="exclamationmark" size={8} color="#ef4444" />
                  </View>
                )}
              </View>
            </View>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.inactiveButton]} 
          onPress={() => handleQuickAction('manage')}
        >
          <Text style={styles.inactiveButtonText}>إدارة المتاجر</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.activeButton]} 
          onPress={() => handleQuickAction('subscriptions')}
        >
          <Text style={styles.activeButtonText}>الاشتراكات والقيود</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.inactiveButton]} 
          onPress={() => handleQuickAction('support')}
        >
          <Text style={styles.inactiveButtonText}>الدعم والمساعدة</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.inactiveButton]} 
          onPress={() => handleQuickAction('orders')}
        >
          <Text style={styles.inactiveButtonText}>الطلبات المعتمدة</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.mainTitle}>إدارة الصلاحيات والأذونات</Text>
        
        {stores.map((store) => (
          <View key={store.id} style={styles.storePermissionCard}>
            <View style={styles.storeHeader}>
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{store.storeName}</Text>
                <Text style={styles.storeOwner}>{store.owner}</Text>
              </View>
              <View style={[styles.planBadge, { backgroundColor: `${getPlanColor(store.plan)}20` }]}>
                <Text style={[styles.planText, { color: getPlanColor(store.plan) }]}>
                  {getPlanText(store.plan)}
                </Text>
              </View>
            </View>

            <View style={styles.permissionsContainer}>
              <View style={styles.permissionRow}>
                <Text style={styles.permissionLabel}>السماح بالبيع</Text>
                <Switch
                  value={store.features.allowSelling}
                  onValueChange={() => handleFeatureToggle(store.id, 'allowSelling')}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={store.features.allowSelling ? '#fff' : '#f4f3f4'}
                />
              </View>

              <View style={styles.permissionRow}>
                <Text style={styles.permissionLabel}>السماح بالإعلان</Text>
                <Switch
                  value={store.features.allowAdvertising}
                  onValueChange={() => handleFeatureToggle(store.id, 'allowAdvertising')}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={store.features.allowAdvertising ? '#fff' : '#f4f3f4'}
                />
              </View>

              <View style={styles.permissionRow}>
                <Text style={styles.permissionLabel}>السماح بالتقييم</Text>
                <Switch
                  value={store.features.allowReviews}
                  onValueChange={() => handleFeatureToggle(store.id, 'allowReviews')}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={store.features.allowReviews ? '#fff' : '#f4f3f4'}
                />
              </View>

              <View style={styles.permissionRow}>
                <Text style={styles.permissionLabel}>السماح بعدد غير محدود للمنتجات</Text>
                <Switch
                  value={store.features.maxProductsCount}
                  onValueChange={() => handleFeatureToggle(store.id, 'maxProductsCount')}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={store.features.maxProductsCount ? '#fff' : '#f4f3f4'}
                />
              </View>

              <View style={styles.permissionRow}>
                <Text style={styles.permissionLabel}>التوصيل للمشتركين</Text>
                <Switch
                  value={store.features.allowSubscription}
                  onValueChange={() => handleFeatureToggle(store.id, 'allowSubscription')}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={store.features.allowSubscription ? '#fff' : '#f4f3f4'}
                />
              </View>
            </View>
          </View>
        ))}
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
    backgroundColor: '#8b5cf6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  backText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 8,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  exportText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '30%',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    marginBottom: 12,
  },
  statIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeButton: {
    backgroundColor: '#e2e8f0',
    borderBottomWidth: 2,
    borderBottomColor: '#8b5cf6',
  },
  inactiveButton: {
    backgroundColor: '#e2e8f0',
  },
  activeButtonText: {
    fontSize: 11,
    color: '#8b5cf6',
    fontWeight: '700',
  },
  inactiveButtonText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  mainContent: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 20,
  },
  storePermissionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  storeOwner: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'right',
  },
  planBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  planText: {
    fontSize: 12,
    fontWeight: '600',
  },
  permissionsContainer: {
    gap: 16,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  permissionLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    paddingRight: 12,
  },
});
