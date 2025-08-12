
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface Store {
  id: number;
  name: string;
  owner: string;
  location: string;
  category: string;
  status: 'verified' | 'pending' | 'suspended' | 'rejected';
  rating: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  joinDate: string;
  isVip: boolean;
}

export default function AdminStoresAdvanced() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [stores, setStores] = useState<Store[]>([
    {
      id: 1,
      name: 'متجر الخرطوم السوداني',
      owner: 'أحمد محمد',
      location: 'الرياض، السعودية',
      category: 'طعام',
      status: 'verified',
      rating: 4.8,
      totalProducts: 145,
      totalOrders: 428,
      revenue: 545420,
      joinDate: '2024-01-15',
      isVip: true,
    },
    {
      id: 2,
      name: 'العطور السودانية الأصيلة',
      owner: 'فاطمة عبدالله',
      location: 'جدة، السعودية',
      category: 'عطور',
      status: 'verified',
      rating: 4.3,
      totalProducts: 23,
      totalOrders: 67,
      revenue: 58900,
      joinDate: '2024-02-20',
      isVip: false,
    },
    {
      id: 3,
      name: 'الحرف اليدوية السودانية',
      owner: 'محمد الطاهر',
      location: 'الدمام، السعودية',
      category: 'حرف',
      status: 'pending',
      rating: 4.5,
      totalProducts: 67,
      totalOrders: 156,
      revenue: 512750,
      joinDate: '2024-01-08',
      isVip: false,
    },
    {
      id: 4,
      name: 'الألبسة التراثية',
      owner: 'عائشة السيد',
      location: 'مكة، السعودية',
      category: 'أزياء',
      status: 'verified',
      rating: 3.9,
      totalProducts: 34,
      totalOrders: 89,
      revenue: 67650,
      joinDate: '2024-02-01',
      isVip: false,
    },
  ]);

  // إحصائيات عامة
  const stats = [
    { 
      id: 1, 
      title: 'متاجر الطعام', 
      value: '2', 
      icon: 'house.fill', 
      color: '#ef4444', 
      bgColor: '#fef2f2',
      alert: true 
    },
    { 
      id: 2, 
      title: 'إجمالي الإيرادات', 
      value: '$74,720', 
      icon: 'paperplane.fill', 
      color: '#10b981', 
      bgColor: '#ecfdf5' 
    },
    { 
      id: 3, 
      title: 'متاجر موثقة', 
      value: '2', 
      icon: 'checkmark.shield', 
      color: '#3b82f6', 
      bgColor: '#eff6ff' 
    },
    { 
      id: 4, 
      title: 'متاجر معتمدة', 
      value: '1', 
      icon: 'star.fill', 
      color: '#8b5cf6', 
      bgColor: '#f3e8ff' 
    },
    { 
      id: 5, 
      title: 'متاجر معلقة', 
      value: '1', 
      icon: 'checkmark.circle', 
      color: '#10b981', 
      bgColor: '#ecfdf5' 
    },
    { 
      id: 6, 
      title: 'إجمالي المتاجر', 
      value: '4', 
      icon: 'building.2', 
      color: '#06b6d4', 
      bgColor: '#ecfeff' 
    },
  ];

  const categories = ['all', 'طعام', 'عطور', 'حرف', 'أزياء'];
  const statusOptions = ['all', 'verified', 'pending', 'suspended', 'rejected'];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || store.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || store.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
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
      case 'verified':
        return 'موثق';
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'طعام':
        return '#f59e0b';
      case 'عطور':
        return '#8b5cf6';
      case 'حرف':
        return '#10b981';
      case 'أزياء':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleStoreAction = (store: Store, action: string) => {
    switch (action) {
      case 'verify':
        Alert.alert('تأكيد التوثيق', `هل تريد توثيق متجر "${store.name}"؟`, [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'توثيق', onPress: () => Alert.alert('نجح', 'تم توثيق المتجر بنجاح') },
        ]);
        break;
      case 'suspend':
        Alert.alert('تأكيد التعليق', `هل تريد تعليق متجر "${store.name}"؟`, [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'تعليق', onPress: () => Alert.alert('تم', 'تم تعليق المتجر'), style: 'destructive' },
        ]);
        break;
      case 'contact':
        Alert.alert('تواصل', `التواصل مع صاحب متجر "${store.name}"`);
        break;
      case 'details':
        Alert.alert('تفاصيل المتجر', `عرض تفاصيل كاملة لمتجر "${store.name}"`);
        break;
      default:
        break;
    }
  };

  const exportData = () => {
    Alert.alert('تصدير البيانات', 'سيتم تصدير بيانات المتاجر إلى ملف Excel');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IconSymbol name="chevron.right" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>إدارة المتاجر المتقدمة</Text>
          <Text style={styles.headerSubtitle}>التحكم الكامل ومراجعة وإدارة المتاجر المسجلة</Text>
        </View>

        <TouchableOpacity style={styles.exportButton} onPress={exportData}>
          <IconSymbol name="square.and.arrow.up" size={20} color="#fff" />
          <Text style={styles.exportText}>تصدير البيانات</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat) => (
          <View key={stat.id} style={[styles.statCard, { backgroundColor: stat.bgColor }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <IconSymbol name={stat.icon} size={20} color={stat.color} />
              </View>
              {stat.alert && (
                <View style={styles.alertBadge}>
                  <IconSymbol name="exclamationmark" size={12} color="#ef4444" />
                </View>
              )}
            </View>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>إدارة المتاجر</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>الاشتراكات والقيود</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>الدعم والمساعدة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>الطلبات المعتمدة</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersSection}>
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="البحث في المتاجر..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filtersRow}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>جميع الحالات</Text>
            <TouchableOpacity style={styles.filterDropdown}>
              <Text style={styles.filterText}>جميع الحالات</Text>
              <IconSymbol name="chevron.down" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>جميع التخطيط</Text>
            <TouchableOpacity style={styles.filterDropdown}>
              <Text style={styles.filterText}>جميع التخطيط</Text>
              <IconSymbol name="chevron.down" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.resultCount}>٤ متاجر</Text>
        </View>
      </View>

      {/* Stores Grid */}
      <View style={styles.storesGrid}>
        {filteredStores.map((store) => (
          <View key={store.id} style={styles.storeCard}>
            {/* Store Header */}
            <View style={styles.storeCardHeader}>
              <View style={styles.storeInfo}>
                <View style={styles.storeNameRow}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  {store.isVip && (
                    <View style={styles.vipBadge}>
                      <IconSymbol name="star.fill" size={12} color="#f59e0b" />
                    </View>
                  )}
                </View>
                <Text style={styles.storeOwner}>{store.owner}</Text>
                <Text style={styles.storeLocation}>{store.location}</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <IconSymbol name="ellipsis" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Store Tags */}
            <View style={styles.storeTags}>
              <View style={[styles.categoryTag, { backgroundColor: `${getCategoryColor(store.category)}20` }]}>
                <Text style={[styles.categoryText, { color: getCategoryColor(store.category) }]}>
                  {store.category}
                </Text>
              </View>
              <View style={[styles.statusTag, { backgroundColor: `${getStatusColor(store.status)}20` }]}>
                <Text style={[styles.statusText, { color: getStatusColor(store.status) }]}>
                  {getStatusText(store.status)}
                </Text>
              </View>
              {store.status === 'verified' && (
                <View style={styles.verifiedTag}>
                  <Text style={styles.verifiedText}>معتمد</Text>
                </View>
              )}
            </View>

            {/* Store Stats */}
            <View style={styles.storeStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{store.totalProducts}</Text>
                <Text style={styles.statLabel}>منتج</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{store.totalOrders}</Text>
                <Text style={styles.statLabel}>طلب</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{store.revenue.toLocaleString()}</Text>
                <Text style={styles.statLabel}>ريال</Text>
              </View>
            </View>

            {/* Rating */}
            <View style={styles.ratingContainer}>
              <IconSymbol name="star.fill" size={16} color="#fbbf24" />
              <Text style={styles.ratingText}>{store.rating}</Text>
              <Text style={styles.ratingCount}>({store.totalOrders})</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.storeActions}>
              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => handleStoreAction(store, 'details')}
              >
                <IconSymbol name="list.bullet.rectangle" size={16} color="#6b7280" />
                <Text style={styles.detailsButtonText}>تفصيل البيانات</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleStoreAction(store, 'contact')}
              >
                <IconSymbol name="message" size={16} color="#6b7280" />
                <Text style={styles.contactButtonText}>تواصل</Text>
              </TouchableOpacity>
            </View>

            {/* Status-specific Action */}
            {store.status === 'verified' && (
              <TouchableOpacity 
                style={styles.verifyButton}
                onPress={() => handleStoreAction(store, 'verify')}
              >
                <IconSymbol name="checkmark" size={16} color="#fff" />
                <Text style={styles.verifyButtonText}>متجر موثق</Text>
              </TouchableOpacity>
            )}

            {store.status === 'pending' && (
              <TouchableOpacity 
                style={styles.pendingButton}
                onPress={() => handleStoreAction(store, 'verify')}
              >
                <IconSymbol name="clock" size={16} color="#fff" />
                <Text style={styles.pendingButtonText}>يتطلب موافقة</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {filteredStores.length === 0 && (
        <View style={styles.emptyState}>
          <IconSymbol name="building.2" size={48} color="#9ca3af" />
          <Text style={styles.emptyStateText}>لا توجد متاجر مطابقة للبحث</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
    paddingHorizontal: 16,
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
    marginTop: 4,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  exportText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '30%',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  filtersSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
    color: '#1f2937',
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  filterGroup: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    textAlign: 'right',
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterText: {
    fontSize: 12,
    color: '#374151',
  },
  resultCount: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  storesGrid: {
    padding: 16,
    gap: 16,
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  storeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  storeInfo: {
    flex: 1,
  },
  storeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    textAlign: 'right',
  },
  vipBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeOwner: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
    textAlign: 'right',
  },
  storeLocation: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  verifiedTag: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#16a34a',
    fontSize: 11,
    fontWeight: '600',
  },
  storeStats: {
    flexDirection: 'row',
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
    fontSize: 10,
    color: '#6b7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  ratingCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  storeActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  detailsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 4,
  },
  detailsButtonText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 4,
  },
  contactButtonText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  verifyButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  pendingButton: {
    backgroundColor: '#f59e0b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  pendingButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
});
