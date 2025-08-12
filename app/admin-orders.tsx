
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  storeName: string;
  items: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: '#74720',
      customerName: 'أحمد محمد',
      storeName: 'متجر الخرطوم السوداني',
      items: 3,
      total: 19690,
      status: 'confirmed',
      date: 'منذ ساعة',
    },
    {
      id: 2,
      orderNumber: '#740',
      customerName: 'فاطمة علي',
      storeName: 'العطور السودانية الأصيلة',
      items: 2,
      total: 269,
      status: 'shipped',
      date: 'منذ 3 ساعات',
    },
    {
      id: 3,
      orderNumber: '#58900',
      customerName: 'محمد سعد',
      storeName: 'الألبسة التراثية',
      items: 1,
      total: 7650,
      status: 'delivered',
      date: 'أمس',
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

  // إحصائيات الأداء
  const performanceStats = [
    { title: 'معدل النشاط', value: '25%' },
    { title: 'معدل التوثيق', value: '50%' },
    { title: 'معدل الانتظار', value: '25%' },
    { title: 'معدل التغيير', value: '25%' },
  ];

  // تحليل الإيرادات
  const revenueAnalysis = [
    { title: 'إجمالي الإيرادات', value: '$74,720' },
    { title: 'متوسط الإيرادات لكل متجر', value: '$19,690' },
    { title: 'إجمالي الطلبات', value: '740' },
    { title: 'إجمالي المنتجات', value: '269' },
  ];

  const handleBack = () => {
    router.back();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'confirmed':
        return '#3b82f6';
      case 'shipped':
        return '#8b5cf6';
      case 'delivered':
        return '#10b981';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'في الانتظار';
      case 'confirmed':
        return 'مؤكد';
      case 'shipped':
        return 'تم الشحن';
      case 'delivered':
        return 'تم التوصيل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  const handleOrderAction = (order: Order, action: string) => {
    switch (action) {
      case 'view':
        Alert.alert('تفاصيل الطلب', `عرض تفاصيل الطلب ${order.orderNumber}\n\nالعميل: ${order.customerName}\nالمتجر: ${order.storeName}\nعدد المنتجات: ${order.items}\nالإجمالي: ${order.total.toLocaleString()} ريال`);
        break;
      case 'track':
        Alert.alert('تتبع الطلب', `تتبع حالة الطلب ${order.orderNumber}\nالحالة الحالية: ${getStatusText(order.status)}`);
        break;
      default:
        break;
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'manage':
        router.push('/admin-stores-advanced');
        break;
      case 'subscriptions':
        router.push('/admin-subscriptions');
        break;
      case 'support':
        router.push('/admin-support');
        break;
      case 'orders':
        Alert.alert('الطلبات المعتمدة', 'أنت في شاشة الطلبات المعتمدة حالياً');
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
          style={[styles.actionButton, styles.inactiveButton]} 
          onPress={() => handleQuickAction('subscriptions')}
        >
          <Text style={styles.inactiveButtonText}>الاشتراكات والقيود</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.inactiveButton]} 
          onPress={() => handleQuickAction('support')}
        >
          <Text style={styles.inactiveButtonText}>الدعم والمساعدة</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.activeButton]} 
          onPress={() => handleQuickAction('orders')}
        >
          <Text style={styles.activeButtonText}>الطلبات المعتمدة</Text>
        </TouchableOpacity>
      </View>

      {/* Analytics Section */}
      <View style={styles.analyticsContainer}>
        <View style={styles.analyticsSection}>
          <Text style={styles.analyticsTitle}>تحليل الأداء</Text>
          <View style={styles.performanceGrid}>
            {performanceStats.map((stat, index) => (
              <View key={index} style={styles.performanceItem}>
                <Text style={styles.performanceValue}>{stat.value}</Text>
                <Text style={styles.performanceLabel}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.analyticsSection}>
          <Text style={styles.analyticsTitle}>تحليل الإيرادات</Text>
          <View style={styles.revenueGrid}>
            {revenueAnalysis.map((item, index) => (
              <View key={index} style={styles.revenueItem}>
                <Text style={styles.revenueValue}>{item.value}</Text>
                <Text style={styles.revenueLabel}>{item.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Orders List */}
      <View style={styles.ordersContainer}>
        <Text style={styles.sectionTitle}>الطلبات المعتمدة</Text>
        
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                <Text style={styles.customerName}>العميل: {order.customerName}</Text>
                <Text style={styles.storeName}>{order.storeName}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={styles.orderDetails}>
                <View style={styles.orderAmount}>
                  <Text style={styles.orderTotal}>{order.total.toLocaleString()} ريال</Text>
                  <Text style={styles.orderItems}>{order.items} منتجات</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(order.status)}15` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                    {getStatusText(order.status)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.orderActions}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleOrderAction(order, 'view')}
              >
                <IconSymbol name="eye.fill" size={14} color="#6b7280" />
                <Text style={styles.viewButtonText}>عرض التفاصيل</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.trackButton}
                onPress={() => handleOrderAction(order, 'track')}
              >
                <IconSymbol name="location.fill" size={14} color="#6b7280" />
                <Text style={styles.trackButtonText}>تتبع الطلب</Text>
              </TouchableOpacity>
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
  analyticsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 20,
  },
  analyticsSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  performanceGrid: {
    gap: 12,
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  performanceLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  revenueGrid: {
    gap: 12,
  },
  revenueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  revenueValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  revenueLabel: {
    fontSize: 12,
    color: '#64748b',
    flex: 1,
    textAlign: 'right',
    paddingRight: 12,
  },
  ordersContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
    paddingRight: 16,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  customerName: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 2,
    textAlign: 'right',
  },
  storeName: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 2,
    textAlign: 'right',
  },
  orderDate: {
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'right',
  },
  orderDetails: {
    alignItems: 'flex-end',
    gap: 8,
  },
  orderAmount: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 2,
  },
  orderItems: {
    fontSize: 12,
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    gap: 6,
  },
  viewButtonText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  trackButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    gap: 6,
  },
  trackButtonText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
});
