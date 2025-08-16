
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  products: OrderProduct[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: 'cash' | 'card' | 'transfer' | 'wallet';
  date: string;
  time: string;
  shippingAddress: string;
  notes: string;
  estimatedDelivery: string;
}

interface OrderProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  variant?: string;
}

export default function MerchantOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: '#ORD-2024-001',
      customerName: 'أحمد محمد علي',
      customerPhone: '+966501234567',
      customerEmail: 'ahmed@example.com',
      products: [
        { id: 1, name: 'عطر صندل بجدائي', quantity: 2, price: 150, image: '', variant: 'حجم كبير' },
        { id: 2, name: 'مسك أبيض طبيعي', quantity: 1, price: 85, image: '' }
      ],
      total: 385,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'cash',
      date: '2024-01-20',
      time: '14:30',
      shippingAddress: 'الرياض، حي النرجس، شارع الأمير محمد بن عبدالعزيز',
      notes: 'يرجى التسليم قبل المغرب',
      estimatedDelivery: '2024-01-22'
    },
    {
      id: 2,
      orderNumber: '#ORD-2024-002',
      customerName: 'فاطمة عبدالله',
      customerPhone: '+966507654321',
      customerEmail: 'fatima@example.com',
      products: [
        { id: 3, name: 'عود كمبودي فاخر', quantity: 1, price: 450, image: '', variant: 'درجة أولى' }
      ],
      total: 450,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'card',
      date: '2024-01-20',
      time: '16:15',
      shippingAddress: 'جدة، حي الزهراء، طريق الملك عبدالعزيز',
      notes: '',
      estimatedDelivery: '2024-01-23'
    },
    {
      id: 3,
      orderNumber: '#ORD-2024-003',
      customerName: 'محمد سعد الدين',
      customerPhone: '+966503456789',
      customerEmail: 'mohammed@example.com',
      products: [
        { id: 4, name: 'مجموعة عطور متنوعة', quantity: 1, price: 320, image: '', variant: 'عرض خاص' },
        { id: 5, name: 'بخور فاخر', quantity: 2, price: 65, image: '' }
      ],
      total: 450,
      status: 'preparing',
      paymentStatus: 'paid',
      paymentMethod: 'transfer',
      date: '2024-01-19',
      time: '11:20',
      shippingAddress: 'الدمام، حي الشاطئ، شارع الكورنيش',
      notes: 'عميل مميز - يرجى الاهتمام بالتغليف',
      estimatedDelivery: '2024-01-24'
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const statusFilters = [
    { key: 'all', label: 'جميع الطلبات', count: orders.length },
    { key: 'pending', label: 'في الانتظار', count: orders.filter(o => o.status === 'pending').length },
    { key: 'confirmed', label: 'مؤكدة', count: orders.filter(o => o.status === 'confirmed').length },
    { key: 'preparing', label: 'قيد التحضير', count: orders.filter(o => o.status === 'preparing').length },
    { key: 'ready', label: 'جاهزة للتسليم', count: orders.filter(o => o.status === 'ready').length },
    { key: 'shipped', label: 'تم الشحن', count: orders.filter(o => o.status === 'shipped').length },
    { key: 'delivered', label: 'تم التوصيل', count: orders.filter(o => o.status === 'delivered').length },
    { key: 'cancelled', label: 'ملغية', count: orders.filter(o => o.status === 'cancelled').length }
  ];

  const paymentStatusFilters = [
    { key: 'all', label: 'جميع الدفعات' },
    { key: 'pending', label: 'في الانتظار' },
    { key: 'paid', label: 'مدفوعة' },
    { key: 'refunded', label: 'مسترد' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPayment = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerPhone.includes(searchQuery);
    return matchesStatus && matchesPayment && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return '#3b82f6';
      case 'preparing': return '#8b5cf6';
      case 'ready': return '#06b6d4';
      case 'shipped': return '#84cc16';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'confirmed': return 'مؤكد';
      case 'preparing': return 'قيد التحضير';
      case 'ready': return 'جاهز للتسليم';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التوصيل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'paid': return '#10b981';
      case 'refunded': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'paid': return 'مدفوع';
      case 'refunded': return 'مسترد';
      default: return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'cash': return 'نقدي';
      case 'card': return 'بطاقة';
      case 'transfer': return 'تحويل';
      case 'wallet': return 'محفظة إلكترونية';
      default: return method;
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleOrderPress = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleStatusChange = (order: Order, status: string) => {
    setSelectedOrder(order);
    setNewStatus(status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (selectedOrder && newStatus) {
      setOrders(prev => prev.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: newStatus as any }
          : order
      ));
      setShowStatusModal(false);
      setSelectedOrder(null);
      setNewStatus('');
      Alert.alert('تم التحديث', 'تم تحديث حالة الطلب بنجاح');
    }
  };

  const handlePrintOrder = (order: Order) => {
    Alert.alert('طباعة الطلب', `سيتم طباعة الطلب ${order.orderNumber}`);
  };

  const handleContactCustomer = (order: Order) => {
    Alert.alert(
      'التواصل مع العميل',
      `العميل: ${order.customerName}\nالهاتف: ${order.customerPhone}\nالبريد: ${order.customerEmail}`,
      [
        { text: 'اتصال', onPress: () => Alert.alert('اتصال', `جاري الاتصال بـ ${order.customerPhone}`) },
        { text: 'رسالة', onPress: () => Alert.alert('رسالة', 'جاري فتح تطبيق الرسائل') },
        { text: 'إلغاء', style: 'cancel' }
      ]
    );
  };

  const handleExportOrders = () => {
    Alert.alert('تصدير الطلبات', 'سيتم تصدير جميع الطلبات إلى ملف Excel');
  };

  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(order => order.date === today);
    return {
      count: todayOrders.length,
      revenue: todayOrders.reduce((sum, order) => sum + order.total, 0),
      pending: todayOrders.filter(order => order.status === 'pending').length
    };
  };

  const todayStats = getTodayStats();

  return (
    <View style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.right" size={20} color="#fff" />
            <Text style={styles.backText}>العودة</Text>
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>إدارة الطلبات</Text>
            <Text style={styles.headerSubtitle}>إدارة شاملة لجميع طلبات المتجر</Text>
          </View>

          <TouchableOpacity style={styles.exportButton} onPress={handleExportOrders}>
            <IconSymbol name="square.and.arrow.down.fill" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Today Stats */}
      <View style={styles.todayStatsContainer}>
        <View style={styles.todayStatCard}>
          <Text style={styles.todayStatNumber}>{todayStats.count}</Text>
          <Text style={styles.todayStatLabel}>طلبات اليوم</Text>
        </View>
        <View style={styles.todayStatCard}>
          <Text style={[styles.todayStatNumber, { color: '#10b981' }]}>{todayStats.revenue.toLocaleString()} ريال</Text>
          <Text style={styles.todayStatLabel}>إيرادات اليوم</Text>
        </View>
        <View style={styles.todayStatCard}>
          <Text style={[styles.todayStatNumber, { color: '#f59e0b' }]}>{todayStats.pending}</Text>
          <Text style={styles.todayStatLabel}>في الانتظار</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search and Filters */}
        <View style={styles.filtersSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="البحث برقم الطلب، اسم العميل أو رقم الهاتف..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <IconSymbol name="magnifyingglass" size={20} color="#64748b" />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusFilters}>
            {statusFilters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.statusFilterButton,
                  selectedStatus === filter.key && styles.activeStatusFilter
                ]}
                onPress={() => setSelectedStatus(filter.key)}
              >
                <Text style={[
                  styles.statusFilterText,
                  selectedStatus === filter.key && styles.activeStatusFilterText
                ]}>
                  {filter.label} ({filter.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.paymentFilters}>
            {paymentStatusFilters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.paymentFilterButton,
                  selectedPaymentStatus === filter.key && styles.activePaymentFilter
                ]}
                onPress={() => setSelectedPaymentStatus(filter.key)}
              >
                <Text style={[
                  styles.paymentFilterText,
                  selectedPaymentStatus === filter.key && styles.activePaymentFilterText
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Orders List */}
        <View style={styles.ordersContainer}>
          <Text style={styles.ordersHeader}>
            الطلبات ({filteredOrders.length})
          </Text>

          {filteredOrders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => handleOrderPress(order)}
            >
              <View style={styles.orderHeader}>
                <View style={styles.orderBasicInfo}>
                  <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                  <Text style={styles.orderDate}>{order.date} - {order.time}</Text>
                </View>
                <View style={styles.orderStatusContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                  <View style={[styles.paymentBadge, { backgroundColor: `${getPaymentStatusColor(order.paymentStatus)}20` }]}>
                    <Text style={[styles.paymentText, { color: getPaymentStatusColor(order.paymentStatus) }]}>
                      {getPaymentStatusText(order.paymentStatus)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.orderCustomerInfo}>
                <Text style={styles.customerName}>{order.customerName}</Text>
                <Text style={styles.customerPhone}>{order.customerPhone}</Text>
              </View>

              <View style={styles.orderProductsPreview}>
                <Text style={styles.productsCount}>
                  {order.products.length} منتج - {order.products.reduce((sum, p) => sum + p.quantity, 0)} قطعة
                </Text>
                <Text style={styles.orderTotal}>{order.total.toLocaleString()} ريال</Text>
              </View>

              <View style={styles.orderActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleContactCustomer(order)}
                >
                  <IconSymbol name="phone.fill" size={14} color="#3b82f6" />
                  <Text style={styles.actionButtonText}>اتصال</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handlePrintOrder(order)}
                >
                  <IconSymbol name="printer.fill" size={14} color="#6b7280" />
                  <Text style={styles.actionButtonText}>طباعة</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.statusActionButton]}
                  onPress={() => {
                    const nextStatus = order.status === 'pending' ? 'confirmed' :
                                     order.status === 'confirmed' ? 'preparing' :
                                     order.status === 'preparing' ? 'ready' :
                                     order.status === 'ready' ? 'shipped' :
                                     order.status === 'shipped' ? 'delivered' : order.status;
                    if (nextStatus !== order.status) {
                      handleStatusChange(order, nextStatus);
                    }
                  }}
                >
                  <IconSymbol name="arrow.clockwise" size={14} color="#10b981" />
                  <Text style={[styles.actionButtonText, { color: '#10b981' }]}>تحديث الحالة</Text>
                </TouchableOpacity>
              </View>

              {order.notes && (
                <View style={styles.orderNotes}>
                  <IconSymbol name="note.text" size={14} color="#f59e0b" />
                  <Text style={styles.notesText}>{order.notes}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}

          {filteredOrders.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol name="tray" size={48} color="#94a3b8" />
              <Text style={styles.emptyStateText}>لا توجد طلبات مطابقة للبحث</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Order Details Modal */}
      <Modal
        visible={showOrderModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOrderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.orderDetailsModal}>
            {selectedOrder && (
              <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedOrder.orderNumber}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowOrderModal(false)}
                  >
                    <IconSymbol name="xmark" size={20} color="#6b7280" />
                  </TouchableOpacity>
                </View>

                <View style={styles.orderDetailSection}>
                  <Text style={styles.sectionTitle}>معلومات العميل</Text>
                  <View style={styles.customerDetails}>
                    <Text style={styles.customerDetailText}>الاسم: {selectedOrder.customerName}</Text>
                    <Text style={styles.customerDetailText}>الهاتف: {selectedOrder.customerPhone}</Text>
                    <Text style={styles.customerDetailText}>البريد: {selectedOrder.customerEmail}</Text>
                    <Text style={styles.customerDetailText}>العنوان: {selectedOrder.shippingAddress}</Text>
                  </View>
                </View>

                <View style={styles.orderDetailSection}>
                  <Text style={styles.sectionTitle}>تفاصيل الطلب</Text>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderDetailText}>التاريخ: {selectedOrder.date} - {selectedOrder.time}</Text>
                    <Text style={styles.orderDetailText}>طريقة الدفع: {getPaymentMethodText(selectedOrder.paymentMethod)}</Text>
                    <Text style={styles.orderDetailText}>التوصيل المتوقع: {selectedOrder.estimatedDelivery}</Text>
                  </View>
                </View>

                <View style={styles.orderDetailSection}>
                  <Text style={styles.sectionTitle}>المنتجات</Text>
                  {selectedOrder.products.map((product) => (
                    <View key={product.id} style={styles.productItem}>
                      <View style={styles.productInfo}>
                        <Text style={styles.productName}>{product.name}</Text>
                        {product.variant && (
                          <Text style={styles.productVariant}>{product.variant}</Text>
                        )}
                        <Text style={styles.productPrice}>{product.price} ريال × {product.quantity}</Text>
                      </View>
                      <Text style={styles.productTotal}>{(product.price * product.quantity).toLocaleString()} ريال</Text>
                    </View>
                  ))}
                  <View style={styles.orderTotalSection}>
                    <Text style={styles.orderTotalText}>الإجمالي: {selectedOrder.total.toLocaleString()} ريال</Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalActionButton}
                    onPress={() => handleContactCustomer(selectedOrder)}
                  >
                    <IconSymbol name="phone.fill" size={16} color="#fff" />
                    <Text style={styles.modalActionText}>التواصل مع العميل</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.modalActionButton, styles.printActionButton]}
                    onPress={() => handlePrintOrder(selectedOrder)}
                  >
                    <IconSymbol name="printer.fill" size={16} color="#fff" />
                    <Text style={styles.modalActionText}>طباعة الطلب</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Status Change Modal */}
      <Modal
        visible={showStatusModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowStatusModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.statusModal}>
            <Text style={styles.statusModalTitle}>تحديث حالة الطلب</Text>
            <Text style={styles.statusModalText}>
              هل تريد تغيير حالة الطلب {selectedOrder?.orderNumber} إلى "{getStatusText(newStatus)}"؟
            </Text>
            <View style={styles.statusModalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowStatusModal(false)}
              >
                <Text style={styles.cancelButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmStatusChange}
              >
                <Text style={styles.confirmButtonText}>تأكيد</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayStatsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  todayStatCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  todayStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  todayStatLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  filtersSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
    color: '#1e293b',
  },
  statusFilters: {
    marginBottom: 12,
  },
  statusFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeStatusFilter: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  statusFilterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  activeStatusFilterText: {
    color: '#fff',
  },
  paymentFilters: {},
  paymentFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activePaymentFilter: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  paymentFilterText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748b',
  },
  activePaymentFilterText: {
    color: '#fff',
  },
  ordersContainer: {
    padding: 16,
  },
  ordersHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderBasicInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  orderDate: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
  orderStatusContainer: {
    alignItems: 'flex-end',
    gap: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  paymentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  paymentText: {
    fontSize: 10,
    fontWeight: '600',
  },
  orderCustomerInfo: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
    textAlign: 'right',
  },
  customerPhone: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
  orderProductsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  productsCount: {
    fontSize: 13,
    color: '#64748b',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    gap: 4,
  },
  statusActionButton: {
    backgroundColor: '#ecfdf5',
    borderColor: '#bbf7d0',
  },
  actionButtonText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  orderNotes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fefbf2',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  notesText: {
    flex: 1,
    fontSize: 12,
    color: '#92400e',
    textAlign: 'right',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderDetailsModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalContent: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderDetailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'right',
  },
  customerDetails: {},
  customerDetailText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'right',
  },
  orderInfo: {},
  orderDetailText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'right',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  productInfo: {
    flex: 1,
    paddingRight: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  productVariant: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'right',
  },
  productPrice: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'right',
  },
  productTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  orderTotalSection: {
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#e2e8f0',
    marginTop: 8,
  },
  orderTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'right',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    gap: 8,
  },
  printActionButton: {
    backgroundColor: '#64748b',
  },
  modalActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  statusModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  statusModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  statusModalText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  statusModalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  confirmButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#10b981',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
