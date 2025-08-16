
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

export default function MerchantDashboard() {
  const stats = [
    { id: 1, title: 'مشاهدات المتجر', value: '2,340', icon: 'house.fill', color: '#f59e0b', bgColor: '#fef3c7' },
    { id: 2, title: 'إيرادات الشهر', value: '$15,420', icon: 'paperplane.fill', color: '#8b5cf6', bgColor: '#ede9fe' },
    { id: 3, title: 'إجمالي الطلبات', value: '128', icon: 'chevron.right', color: '#10b981', bgColor: '#d1fae5' },
    { id: 4, title: 'إجمالي المنتجات', value: '45', icon: 'house.fill', color: '#3b82f6', bgColor: '#dbeafe' },
  ];

  const quickActions = [
    { id: 1, title: 'إعدادات المتجر', icon: 'house.fill', color: '#6b7280', action: 'store-settings' },
    { id: 2, title: 'إدارة الطلبات', icon: 'chevron.right', color: '#6b7280', action: 'orders' },
    { id: 3, title: 'إدارة المنتجات', icon: 'house.fill', color: '#6b7280', action: 'products' },
    { id: 4, title: 'إضافة منتج جديد', icon: 'house.fill', color: '#10b981', isHighlighted: true, action: 'add-product' },
  ];

  const storePerformance = {
    totalOrders: 42,
    pendingOrders: 7,
    rating: 4.6,
    totalSales: 89,
  };

  const lowStockProducts = [
    { id: 1, name: 'عطر صندل بجودائي', code: 'ORD-001', quantity: 2, status: 'في الانتظار', price: '$125.5' },
    { id: 2, name: 'فاطمة علي', code: 'ORD-002', quantity: 1, status: 'مؤكد', price: '$45' },
    { id: 3, name: 'محمد سعد', code: 'ORD-003', quantity: 2, status: 'تم التسليم', price: '$89.99' },
    { id: 4, name: 'عائشة أحمد', code: 'ORD-004', quantity: 4, status: 'تم التسليم', price: '$234.75' },
  ];

  const recentOrders = [
    { id: 1, customer: 'أحمد محمد', code: 'ORD-001', items: 3, time: '15 دقيقة', status: 'في الانتظار' },
    { id: 2, customer: 'فاطمة علي', code: 'ORD-002', items: 1, time: '30 دقيقة', status: 'مؤكد' },
    { id: 3, customer: 'محمد سعد', code: 'ORD-003', items: 2, time: '1 ساعة', status: 'تم التسليم' },
    { id: 4, customer: 'عائشة أحمد', code: 'ORD-004', items: 4, time: 'اليوم', status: 'تم التسليم' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'في الانتظار':
        return '#f59e0b';
      case 'مؤكد':
        return '#3b82f6';
      case 'تم التسليم':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const handleLogout = () => {
    router.replace('/auth');
  };

  const handleGoHome = () => {
    router.replace('/(tabs)');
  };

  const handleViewApp = () => {
    router.push('/(tabs)');
  };

  const handleViewStore = () => {
    router.push('/user-store');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'store-settings':
        router.push('/store-settings');
        break;
      case 'orders':
        router.push('/merchant-orders');
        break;
      case 'products':
        router.push('/merchant-products');
        break;
      case 'add-product':
        alert('إضافة منتج جديد - قيد التطوير');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.storeButton} onPress={handleViewStore}>
              <IconSymbol name="paperplane.fill" size={16} color="#10b981" />
              <Text style={styles.storeButtonText}>متجرنا</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewStoreButton} onPress={handleViewApp}>
              <Text style={styles.viewStoreText}>عرض التطبيق</Text>
              <IconSymbol name="house.fill" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerTitle}>لوحة إدارة المتجر</Text>
            <Text style={styles.headerSubtitle}>مرحبا صاحب متجر - متجر الفر</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton} onPress={handleGoHome}>
            <IconSymbol name="house.fill" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat) => (
          <View key={stat.id} style={[styles.statCard, { backgroundColor: stat.bgColor }]}>
            <View style={styles.statHeader}>
              <IconSymbol name={stat.icon} size={20} color={stat.color} />
              <View style={styles.statValues}>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        {quickActions.map((action) => (
          <TouchableOpacity 
            key={action.id} 
            style={[
              styles.quickActionCard,
              action.isHighlighted && styles.highlightedAction
            ]}
            onPress={() => handleQuickAction(action.action)}
          >
            <IconSymbol name={action.icon} size={24} color={action.color} />
            <Text style={[
              styles.quickActionText,
              { color: action.isHighlighted ? '#fff' : '#374151' }
            ]}>
              {action.title}
            </Text>
            {action.isHighlighted && (
              <View style={styles.plusIcon}>
                <Text style={styles.plusText}>+</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentContainer}>
        {/* Store Performance */}
        <View style={styles.performanceSection}>
          <Text style={styles.sectionTitle}>ملا أداء المتجر</Text>
          <TouchableOpacity style={styles.viewDetailsButton} onPress={() => alert('عرض التفاصيل - قيد التطوير')}>
            <Text style={styles.viewDetailsText}>عرض التفاصيل</Text>
          </TouchableOpacity>
          
          <View style={styles.performanceGrid}>
            <View style={styles.performanceCard}>
              <Text style={styles.performanceValue}>{storePerformance.totalOrders}</Text>
              <Text style={styles.performanceLabel}>الطلبات النشطة</Text>
            </View>
            <View style={styles.performanceCard}>
              <Text style={styles.performanceValue}>{storePerformance.pendingOrders}</Text>
              <Text style={styles.performanceLabel}>طلبات معلقة</Text>
            </View>
            <View style={styles.performanceCard}>
              <View style={styles.ratingContainer}>
                <IconSymbol name="house.fill" size={16} color="#fbbf24" />
                <Text style={styles.performanceValue}>{storePerformance.rating}</Text>
              </View>
              <Text style={styles.performanceLabel}>متوسط التقييم</Text>
            </View>
            <View style={styles.performanceCard}>
              <Text style={styles.performanceValue}>{storePerformance.totalSales}</Text>
              <Text style={styles.performanceLabel}>إجمالي المبيعات</Text>
            </View>
          </View>

          {/* Inventory Alert */}
          <View style={styles.inventoryAlert}>
            <View style={styles.alertHeader}>
              <IconSymbol name="house.fill" size={20} color="#ef4444" />
              <Text style={styles.alertTitle}>تنبيه المخزون</Text>
            </View>
            <View style={styles.alertBadges}>
              <View style={styles.alertBadge}>
                <Text style={styles.alertBadgeText}>2 منخفض</Text>
              </View>
              <View style={styles.alertBadge}>
                <Text style={styles.alertBadgeText}>1 نفذ</Text>
              </View>
              <View style={styles.alertBadge}>
                <Text style={styles.alertBadgeText}>قد المخزون</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.manageInventoryButton} onPress={() => alert('إدارة المخزون - قيد التطوير')}>
              <Text style={styles.manageInventoryText}>إدارة المخزون</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.ordersSection}>
          <View style={styles.ordersSectionHeader}>
            <Text style={styles.sectionTitle}>الطلبات الأخيرة</Text>
            <TouchableOpacity onPress={() => router.push('/merchant-orders')}>
              <Text style={styles.viewAllOrdersText}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          
          {recentOrders.map((order) => (
            <TouchableOpacity 
              key={order.id} 
              style={styles.orderCard}
              onPress={() => router.push('/merchant-orders')}
            >
              <View style={styles.orderInfo}>
                <Text style={styles.orderCustomer}>{order.customer}</Text>
                <Text style={styles.orderCode}>{order.code}</Text>
                <Text style={styles.orderTime}>منذ {order.time}</Text>
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderItems}>{order.items} منتجات</Text>
                <View style={[styles.orderStatus, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
                  <Text style={[styles.orderStatusText, { color: getStatusColor(order.status) }]}>
                    {order.status}
                  </Text>
                </View>
              </View>
              <IconSymbol name="paperplane.fill" size={16} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Store Customization */}
        <View style={styles.customizationSection}>
          <Text style={styles.sectionTitle}>تخصيص المتجر</Text>
          <View style={styles.customizationOptions}>
            <TouchableOpacity style={styles.customizationOption} onPress={() => router.push('/store-settings')}>
              <Text style={styles.customizationText}>تخصيص المتجر</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customizationOption} onPress={() => router.push('/store-settings')}>
              <Text style={styles.customizationText}>تحديث المعلومات</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customizationOption} onPress={() => alert('التقارير المفصلة - قيد التطوير')}>
              <Text style={styles.customizationText}>تقارير مفصلة</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#10b981',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 8,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  storeButtonText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600',
  },
  viewStoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  viewStoreText: {
    color: '#fff',
    fontSize: 12,
  },
  headerRight: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  settingsButton: {
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
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    borderRadius: 12,
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statValues: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  highlightedAction: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  plusIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
    gap: 20,
  },
  performanceSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'right',
  },
  viewDetailsButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  viewDetailsText: {
    color: '#3b82f6',
    fontSize: 12,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  performanceCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  inventoryAlert: {
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  alertBadges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  alertBadge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  alertBadgeText: {
    fontSize: 10,
    color: '#dc2626',
  },
  manageInventoryButton: {
    alignSelf: 'flex-start',
  },
  manageInventoryText: {
    color: '#3b82f6',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  ordersSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  ordersSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  orderInfo: {
    flex: 1,
  },
  orderCustomer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'right',
    marginBottom: 2,
  },
  orderCode: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'right',
  },
  orderDetails: {
    alignItems: 'flex-end',
    marginHorizontal: 12,
  },
  orderItems: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  orderStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  orderStatusText: {
    fontSize: 10,
    fontWeight: '500',
  },
  viewAllOrdersText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  customizationSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  customizationOptions: {
    gap: 8,
  },
  customizationOption: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  customizationText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
  },
});
