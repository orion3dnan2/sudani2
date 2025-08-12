
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface Store {
  id: number;
  name: string;
  owner: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  category: string;
  registrationDate: string;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  rating: number;
}

export default function AdminStores() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showStoreModal, setShowStoreModal] = useState(false);

  const stores: Store[] = [
    {
      id: 1,
      name: 'متجر الفر',
      owner: 'أحمد محمد',
      email: 'ahmad@store.com',
      phone: '+966501234567',
      status: 'active',
      category: 'إلكترونيات',
      registrationDate: '2024-01-15',
      totalProducts: 45,
      totalOrders: 128,
      revenue: 15420,
      rating: 4.6,
    },
    {
      id: 2,
      name: 'متجر الأزياء العصرية',
      owner: 'فاطمة علي',
      email: 'fatima@fashion.com',
      phone: '+966507654321',
      status: 'pending',
      category: 'أزياء',
      registrationDate: '2024-02-20',
      totalProducts: 23,
      totalOrders: 45,
      revenue: 8750,
      rating: 4.2,
    },
    {
      id: 3,
      name: 'متجر الطعام الصحي',
      owner: 'محمد سعد',
      email: 'mohammed@food.com',
      phone: '+966503456789',
      status: 'suspended',
      category: 'طعام وشراب',
      registrationDate: '2024-01-08',
      totalProducts: 67,
      totalOrders: 234,
      revenue: 12340,
      rating: 3.8,
    },
    {
      id: 4,
      name: 'متجر الكتب والثقافة',
      owner: 'عائشة أحمد',
      email: 'aisha@books.com',
      phone: '+966509876543',
      status: 'active',
      category: 'كتب',
      registrationDate: '2024-02-01',
      totalProducts: 156,
      totalOrders: 89,
      revenue: 6780,
      rating: 4.9,
    },
    {
      id: 5,
      name: 'متجر الهدايا المميزة',
      owner: 'سالم الأحمد',
      email: 'salem@gifts.com',
      phone: '+966502345678',
      status: 'rejected',
      category: 'هدايا',
      registrationDate: '2024-02-25',
      totalProducts: 12,
      totalOrders: 5,
      revenue: 450,
      rating: 3.0,
    },
  ];

  const statusFilters = [
    { id: 'all', name: 'الكل', count: stores.length },
    { id: 'active', name: 'نشط', count: stores.filter(s => s.status === 'active').length },
    { id: 'pending', name: 'في الانتظار', count: stores.filter(s => s.status === 'pending').length },
    { id: 'suspended', name: 'معلق', count: stores.filter(s => s.status === 'suspended').length },
    { id: 'rejected', name: 'مرفوض', count: stores.filter(s => s.status === 'rejected').length },
  ];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || store.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'suspended':
        return '#ef4444';
      case 'rejected':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'pending':
        return 'في الانتظار';
      case 'suspended':
        return 'معلق';
      case 'rejected':
        return 'مرفوض';
      default:
        return status;
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleStoreAction = (store: Store, action: string) => {
    switch (action) {
      case 'approve':
        Alert.alert('تأكيد الاعتماد', `هل تريد اعتماد متجر "${store.name}"؟`, [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'اعتماد', onPress: () => alert('تم اعتماد المتجر بنجاح') },
        ]);
        break;
      case 'reject':
        Alert.alert('تأكيد الرفض', `هل تريد رفض متجر "${store.name}"؟`, [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'رفض', onPress: () => alert('تم رفض المتجر'), style: 'destructive' },
        ]);
        break;
      case 'suspend':
        Alert.alert('تأكيد التعليق', `هل تريد تعليق متجر "${store.name}"؟`, [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'تعليق', onPress: () => alert('تم تعليق المتجر'), style: 'destructive' },
        ]);
        break;
      case 'activate':
        Alert.alert('تأكيد التفعيل', `هل تريد تفعيل متجر "${store.name}"؟`, [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'تفعيل', onPress: () => alert('تم تفعيل المتجر') },
        ]);
        break;
      case 'view':
        setSelectedStore(store);
        setShowStoreModal(true);
        break;
      case 'delete':
        Alert.alert('تأكيد الحذف', `هل تريد حذف متجر "${store.name}" نهائياً؟`, [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'حذف', onPress: () => alert('تم حذف المتجر نهائياً'), style: 'destructive' },
        ]);
        break;
      default:
        break;
    }
  };

  const handleBulkAction = (action: string) => {
    Alert.alert('إجراء جماعي', `سيتم تطبيق "${action}" على جميع المتاجر المحددة`, [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'تأكيد', onPress: () => alert(`تم تطبيق "${action}" بنجاح`) },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IconSymbol name="chevron.right" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>إدارة المتاجر</Text>
          <Text style={styles.headerSubtitle}>مراجعة وإدارة جميع المتاجر المسجلة</Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => alert('إضافة متجر جديد')}>
          <IconSymbol name="house.fill" size={24} color="#fff" />
        </TouchableOpacity>
      </ThemedView>

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="البحث في المتاجر..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {statusFilters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedStatus === filter.id && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedStatus(filter.id)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedStatus === filter.id && styles.selectedFilterButtonText
              ]}>
                {filter.name} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bulk Actions */}
      <View style={styles.bulkActionsSection}>
        <Text style={styles.bulkActionsTitle}>إجراءات جماعية:</Text>
        <View style={styles.bulkActionsContainer}>
          <TouchableOpacity style={styles.bulkActionButton} onPress={() => handleBulkAction('اعتماد')}>
            <Text style={styles.bulkActionText}>اعتماد المحدد</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bulkActionButton, styles.suspendButton]} onPress={() => handleBulkAction('تعليق')}>
            <Text style={[styles.bulkActionText, styles.suspendButtonText]}>تعليق المحدد</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bulkActionButton, styles.deleteButton]} onPress={() => handleBulkAction('حذف')}>
            <Text style={[styles.bulkActionText, styles.deleteButtonText]}>حذف المحدد</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stores List */}
      <View style={styles.storesSection}>
        <Text style={styles.sectionTitle}>المتاجر ({filteredStores.length})</Text>
        
        {filteredStores.map((store) => (
          <View key={store.id} style={styles.storeCard}>
            <View style={styles.storeHeader}>
              <View style={styles.storeBasicInfo}>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeOwner}>صاحب المتجر: {store.owner}</Text>
                <Text style={styles.storeCategory}>{store.category}</Text>
              </View>
              
              <View style={styles.storeStatus}>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(store.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(store.status) }]}>
                    {getStatusText(store.status)}
                  </Text>
                </View>
                <View style={styles.ratingContainer}>
                  <IconSymbol name="house.fill" size={14} color="#fbbf24" />
                  <Text style={styles.ratingText}>{store.rating}</Text>
                </View>
              </View>
            </View>

            <View style={styles.storeStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{store.totalProducts}</Text>
                <Text style={styles.statLabel}>منتج</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{store.totalOrders}</Text>
                <Text style={styles.statLabel}>طلب</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{store.revenue.toLocaleString()} ر.س</Text>
                <Text style={styles.statLabel}>الإيرادات</Text>
              </View>
            </View>

            <View style={styles.storeContact}>
              <Text style={styles.contactInfo}>{store.email}</Text>
              <Text style={styles.contactInfo}>{store.phone}</Text>
              <Text style={styles.registrationDate}>تاريخ التسجيل: {store.registrationDate}</Text>
            </View>

            <View style={styles.storeActions}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handleStoreAction(store, 'view')}
              >
                <IconSymbol name="house.fill" size={16} color="#3b82f6" />
                <Text style={styles.actionButtonText}>عرض</Text>
              </TouchableOpacity>

              {store.status === 'pending' && (
                <>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.approveButton]} 
                    onPress={() => handleStoreAction(store, 'approve')}
                  >
                    <IconSymbol name="house.fill" size={16} color="#10b981" />
                    <Text style={[styles.actionButtonText, styles.approveButtonText]}>اعتماد</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.rejectButton]} 
                    onPress={() => handleStoreAction(store, 'reject')}
                  >
                    <IconSymbol name="house.fill" size={16} color="#ef4444" />
                    <Text style={[styles.actionButtonText, styles.rejectButtonText]}>رفض</Text>
                  </TouchableOpacity>
                </>
              )}

              {store.status === 'active' && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.suspendButton]} 
                  onPress={() => handleStoreAction(store, 'suspend')}
                >
                  <IconSymbol name="house.fill" size={16} color="#f59e0b" />
                  <Text style={[styles.actionButtonText, styles.suspendButtonText]}>تعليق</Text>
                </TouchableOpacity>
              )}

              {store.status === 'suspended' && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.activateButton]} 
                  onPress={() => handleStoreAction(store, 'activate')}
                >
                  <IconSymbol name="house.fill" size={16} color="#10b981" />
                  <Text style={[styles.actionButtonText, styles.activateButtonText]}>تفعيل</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity 
                style={[styles.actionButton, styles.deleteButton]} 
                onPress={() => handleStoreAction(store, 'delete')}
              >
                <IconSymbol name="house.fill" size={16} color="#ef4444" />
                <Text style={[styles.actionButtonText, styles.deleteButtonText]}>حذف</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {filteredStores.length === 0 && (
          <View style={styles.emptyState}>
            <IconSymbol name="house.fill" size={48} color="#9ca3af" />
            <Text style={styles.emptyStateText}>لا توجد متاجر مطابقة للبحث</Text>
          </View>
        )}
      </View>

      {/* Store Details Modal */}
      <Modal
        visible={showStoreModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowStoreModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedStore && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>تفاصيل المتجر</Text>
                  <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={() => setShowStoreModal(false)}
                  >
                    <IconSymbol name="house.fill" size={24} color="#6b7280" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>معلومات أساسية</Text>
                    <View style={styles.modalField}>
                      <Text style={styles.modalFieldLabel}>اسم المتجر:</Text>
                      <Text style={styles.modalFieldValue}>{selectedStore.name}</Text>
                    </View>
                    <View style={styles.modalField}>
                      <Text style={styles.modalFieldLabel}>صاحب المتجر:</Text>
                      <Text style={styles.modalFieldValue}>{selectedStore.owner}</Text>
                    </View>
                    <View style={styles.modalField}>
                      <Text style={styles.modalFieldLabel}>التصنيف:</Text>
                      <Text style={styles.modalFieldValue}>{selectedStore.category}</Text>
                    </View>
                    <View style={styles.modalField}>
                      <Text style={styles.modalFieldLabel}>الحالة:</Text>
                      <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(selectedStore.status)}20` }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(selectedStore.status) }]}>
                          {getStatusText(selectedStore.status)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>معلومات الاتصال</Text>
                    <View style={styles.modalField}>
                      <Text style={styles.modalFieldLabel}>البريد الإلكتروني:</Text>
                      <Text style={styles.modalFieldValue}>{selectedStore.email}</Text>
                    </View>
                    <View style={styles.modalField}>
                      <Text style={styles.modalFieldLabel}>رقم الهاتف:</Text>
                      <Text style={styles.modalFieldValue}>{selectedStore.phone}</Text>
                    </View>
                    <View style={styles.modalField}>
                      <Text style={styles.modalFieldLabel}>تاريخ التسجيل:</Text>
                      <Text style={styles.modalFieldValue}>{selectedStore.registrationDate}</Text>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>إحصائيات المتجر</Text>
                    <View style={styles.modalStatsGrid}>
                      <View style={styles.modalStatCard}>
                        <Text style={styles.modalStatNumber}>{selectedStore.totalProducts}</Text>
                        <Text style={styles.modalStatLabel}>إجمالي المنتجات</Text>
                      </View>
                      <View style={styles.modalStatCard}>
                        <Text style={styles.modalStatNumber}>{selectedStore.totalOrders}</Text>
                        <Text style={styles.modalStatLabel}>إجمالي الطلبات</Text>
                      </View>
                      <View style={styles.modalStatCard}>
                        <Text style={styles.modalStatNumber}>{selectedStore.revenue.toLocaleString()} ر.س</Text>
                        <Text style={styles.modalStatLabel}>إجمالي الإيرادات</Text>
                      </View>
                      <View style={styles.modalStatCard}>
                        <View style={styles.ratingContainer}>
                          <IconSymbol name="house.fill" size={16} color="#fbbf24" />
                          <Text style={styles.modalStatNumber}>{selectedStore.rating}</Text>
                        </View>
                        <Text style={styles.modalStatLabel}>تقييم المتجر</Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>

                <View style={styles.modalActions}>
                  {selectedStore.status === 'pending' && (
                    <>
                      <TouchableOpacity 
                        style={[styles.modalActionButton, styles.approveButton]} 
                        onPress={() => {
                          handleStoreAction(selectedStore, 'approve');
                          setShowStoreModal(false);
                        }}
                      >
                        <Text style={[styles.modalActionButtonText, styles.approveButtonText]}>اعتماد المتجر</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.modalActionButton, styles.rejectButton]} 
                        onPress={() => {
                          handleStoreAction(selectedStore, 'reject');
                          setShowStoreModal(false);
                        }}
                      >
                        <Text style={[styles.modalActionButtonText, styles.rejectButtonText]}>رفض المتجر</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  
                  {selectedStore.status === 'active' && (
                    <TouchableOpacity 
                      style={[styles.modalActionButton, styles.suspendButton]} 
                      onPress={() => {
                        handleStoreAction(selectedStore, 'suspend');
                        setShowStoreModal(false);
                      }}
                    >
                      <Text style={[styles.modalActionButtonText, styles.suspendButtonText]}>تعليق المتجر</Text>
                    </TouchableOpacity>
                  )}

                  {selectedStore.status === 'suspended' && (
                    <TouchableOpacity 
                      style={[styles.modalActionButton, styles.activateButton]} 
                      onPress={() => {
                        handleStoreAction(selectedStore, 'activate');
                        setShowStoreModal(false);
                      }}
                    >
                      <Text style={[styles.modalActionButtonText, styles.activateButtonText]}>تفعيل المتجر</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    color: '#1f2937',
  },
  filtersContainer: {
    paddingHorizontal: 0,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  selectedFilterButton: {
    backgroundColor: '#3b82f6',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedFilterButtonText: {
    color: '#fff',
  },
  bulkActionsSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  bulkActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'right',
  },
  bulkActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  bulkActionButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  bulkActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  suspendButton: {
    backgroundColor: '#f59e0b',
  },
  suspendButtonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  deleteButtonText: {
    color: '#fff',
  },
  storesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'right',
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  storeBasicInfo: {
    flex: 1,
    paddingRight: 12,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'right',
  },
  storeOwner: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
    textAlign: 'right',
  },
  storeCategory: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
  },
  storeStatus: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  storeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
    marginVertical: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e7eb',
  },
  storeContact: {
    marginBottom: 12,
  },
  contactInfo: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
    textAlign: 'right',
  },
  registrationDate: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
  },
  storeActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  approveButton: {
    backgroundColor: '#d1fae5',
  },
  approveButtonText: {
    color: '#10b981',
  },
  rejectButton: {
    backgroundColor: '#fee2e2',
  },
  rejectButtonText: {
    color: '#ef4444',
  },
  activateButton: {
    backgroundColor: '#d1fae5',
  },
  activateButtonText: {
    color: '#10b981',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    maxHeight: 400,
  },
  modalSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'right',
  },
  modalField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  modalFieldLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  modalFieldValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  modalStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  modalStatCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  modalStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  modalStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
  },
  modalActionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalActionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
