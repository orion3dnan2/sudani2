
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal, Switch, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import { apiService } from '@/services/api';
import { Store, PaginationParams } from '@/types';

export default function AdminStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadStores();
  }, [searchQuery, selectedStatus]);

  const loadStores = async () => {
    setLoading(true);
    try {
      const params: PaginationParams = {
        search: searchQuery,
        ...(selectedStatus !== 'all' && { status: selectedStatus }),
      };
      
      const response = await apiService.getStores(params);
      if (response.success && response.data) {
        setStores(response.data.data || response.data);
      } else {
        Alert.alert('خطأ', response.error || 'فشل في تحميل المتاجر');
      }
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء تحميل المتاجر');
    } finally {
      setLoading(false);
    }
  };

  const handleStoreAction = async (store: Store, action: 'approve' | 'reject' | 'suspend' | 'activate') => {
    setActionLoading(true);
    try {
      let newStatus: string;
      switch (action) {
        case 'approve':
          newStatus = 'active';
          break;
        case 'reject':
          newStatus = 'rejected';
          break;
        case 'suspend':
          newStatus = 'suspended';
          break;
        case 'activate':
          newStatus = 'active';
          break;
        default:
          return;
      }

      const response = await apiService.updateStore(store.id, { status: newStatus });
      if (response.success) {
        Alert.alert('نجح', 'تم تحديث حالة المتجر بنجاح');
        loadStores();
        setModalVisible(false);
      } else {
        Alert.alert('خطأ', response.error || 'فشل في تحديث حالة المتجر');
      }
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء تحديث حالة المتجر');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      case 'suspended': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'مفعل';
      case 'pending': return 'في الانتظار';
      case 'rejected': return 'مرفوض';
      case 'suspended': return 'معلق';
      default: return status;
    }
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || store.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>جاري تحميل المتاجر...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.right" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>إدارة المتاجر</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={loadStores}>
          <IconSymbol name="arrow.clockwise" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="البحث في المتاجر..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {[
            { key: 'all', label: 'الكل' },
            { key: 'pending', label: 'في الانتظار' },
            { key: 'active', label: 'مفعل' },
            { key: 'suspended', label: 'معلق' },
            { key: 'rejected', label: 'مرفوض' }
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedStatus === filter.key && styles.filterButtonActive
              ]}
              onPress={() => setSelectedStatus(filter.key)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedStatus === filter.key && styles.filterButtonTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Stores List */}
      <ScrollView style={styles.storesList} showsVerticalScrollIndicator={false}>
        {filteredStores.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="storefront" size={64} color="#d1d5db" />
            <Text style={styles.emptyStateText}>لا توجد متاجر</Text>
            <Text style={styles.emptyStateSubtext}>لم يتم العثور على متاجر مطابقة للبحث</Text>
          </View>
        ) : (
          filteredStores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={styles.storeCard}
              onPress={() => {
                setSelectedStore(store);
                setModalVisible(true);
              }}
            >
              <View style={styles.storeInfo}>
                <View style={styles.storeHeader}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(store.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(store.status)}</Text>
                  </View>
                </View>
                
                <Text style={styles.storeOwner}>المالك: {store.owner}</Text>
                <Text style={styles.storeEmail}>{store.email}</Text>
                <Text style={styles.storePhone}>{store.phone}</Text>
                <Text style={styles.storeCategory}>الفئة: {store.category}</Text>
                <Text style={styles.storeDate}>تاريخ التسجيل: {new Date(store.registrationDate).toLocaleDateString('ar-SA')}</Text>
                
                <View style={styles.storeStats}>
                  <Text style={styles.statText}>المنتجات: {store.totalProducts}</Text>
                  <Text style={styles.statText}>الطلبات: {store.totalOrders}</Text>
                  <Text style={styles.statText}>الإيرادات: {store.revenue} ريال</Text>
                </View>
              </View>
              
              <IconSymbol name="chevron.left" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Store Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedStore && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedStore.name}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <IconSymbol name="xmark" size={24} color="#374151" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>معلومات المتجر</Text>
                    <Text style={styles.detailText}>المالك: {selectedStore.owner}</Text>
                    <Text style={styles.detailText}>البريد الإلكتروني: {selectedStore.email}</Text>
                    <Text style={styles.detailText}>الهاتف: {selectedStore.phone}</Text>
                    <Text style={styles.detailText}>الفئة: {selectedStore.category}</Text>
                    <Text style={styles.detailText}>الوصف: {selectedStore.description}</Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>الإحصائيات</Text>
                    <Text style={styles.detailText}>المنتجات: {selectedStore.totalProducts}</Text>
                    <Text style={styles.detailText}>الطلبات: {selectedStore.totalOrders}</Text>
                    <Text style={styles.detailText}>الإيرادات: {selectedStore.revenue} ريال</Text>
                    <Text style={styles.detailText}>التقييم: {selectedStore.rating}/5</Text>
                  </View>
                </ScrollView>

                <View style={styles.modalActions}>
                  {selectedStore.status === 'pending' && (
                    <>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.approveButton]}
                        onPress={() => handleStoreAction(selectedStore, 'approve')}
                        disabled={actionLoading}
                      >
                        {actionLoading ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <>
                            <IconSymbol name="checkmark" size={20} color="#fff" />
                            <Text style={styles.actionButtonText}>موافقة</Text>
                          </>
                        )}
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={[styles.actionButton, styles.rejectButton]}
                        onPress={() => handleStoreAction(selectedStore, 'reject')}
                        disabled={actionLoading}
                      >
                        {actionLoading ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <>
                            <IconSymbol name="xmark" size={20} color="#fff" />
                            <Text style={styles.actionButtonText}>رفض</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </>
                  )}
                  
                  {selectedStore.status === 'active' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.suspendButton]}
                      onPress={() => handleStoreAction(selectedStore, 'suspend')}
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <>
                          <IconSymbol name="pause" size={20} color="#fff" />
                          <Text style={styles.actionButtonText}>تعليق</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  )}
                  
                  {(selectedStore.status === 'suspended' || selectedStore.status === 'rejected') && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.activateButton]}
                      onPress={() => handleStoreAction(selectedStore, 'activate')}
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <>
                          <IconSymbol name="play" size={20} color="#fff" />
                          <Text style={styles.actionButtonText}>تفعيل</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  refreshButton: {
    padding: 8,
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
    textAlign: 'right',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#3b82f6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  storesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  storeInfo: {
    flex: 1,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  storeOwner: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  storeEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  storePhone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  storeCategory: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  storeDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  storeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 24,
  },
  detailSection: {
    marginVertical: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  approveButton: {
    backgroundColor: '#10b981',
  },
  rejectButton: {
    backgroundColor: '#ef4444',
  },
  suspendButton: {
    backgroundColor: '#f59e0b',
  },
  activateButton: {
    backgroundColor: '#10b981',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
