import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal, FlatList } from 'react-native';
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
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
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
      status: 'rejected',
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

  const categories = [
    { label: 'جميع التخطيط', value: 'all' },
    { label: 'طعام', value: 'طعام' },
    { label: 'عطور', value: 'عطور' },
    { label: 'حرف', value: 'حرف' },
    { label: 'أزياء', value: 'أزياء' }
  ];

  const statusOptions = [
    { label: 'جميع الحالات', value: 'all' },
    { label: 'موثق', value: 'verified' },
    { label: 'في الانتظار', value: 'pending' },
    { label: 'معلق', value: 'suspended' },
    { label: 'مرفوض', value: 'rejected' }
  ];

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
        return '#6b7280';
      case 'rejected':
        return '#ef4444';
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
    const updatedStores = stores.map(s => {
      if (s.id === store.id) {
        switch (action) {
          case 'verify':
            return { ...s, status: 'verified' as const };
          case 'suspend':
            return { ...s, status: 'suspended' as const };
          case 'reject':
            return { ...s, status: 'rejected' as const };
          default:
            return s;
        }
      }
      return s;
    });

    switch (action) {
      case 'verify':
        setStores(updatedStores);
        Alert.alert('نجح', `تم توثيق متجر "${store.name}" بنجاح`);
        break;
      case 'suspend':
        Alert.alert('تأكيد التعليق', `هل تريد تعليق متجر "${store.name}"؟`, [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'تعليق', onPress: () => {
            setStores(updatedStores);
            Alert.alert('تم', 'تم تعليق المتجر');
          }, style: 'destructive' },
        ]);
        break;
      case 'reject':
        Alert.alert('تأكيد الرفض', `هل تريد رفض متجر "${store.name}"؟`, [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'رفض', onPress: () => {
            setStores(updatedStores);
            Alert.alert('تم', 'تم رفض المتجر');
          }, style: 'destructive' },
        ]);
        break;
      case 'contact':
        Alert.alert('تواصل', `سيتم فتح محادثة مع صاحب متجر "${store.name}"`);
        break;
      case 'details':
        Alert.alert('تفاصيل المتجر', `عرض تفاصيل كاملة لمتجر "${store.name}"\n\nالمالك: ${store.owner}\nالموقع: ${store.location}\nتاريخ التسجيل: ${store.joinDate}\nعدد المنتجات: ${store.totalProducts}\nعدد الطلبات: ${store.totalOrders}\nالإيرادات: ${store.revenue.toLocaleString()} ريال`);
        break;
      default:
        break;
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'manage':
        Alert.alert('إدارة المتاجر', 'أنت في شاشة إدارة المتاجر المتقدمة حالياً');
        break;
      case 'subscriptions':
        router.push('/admin-subscriptions');
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

  const exportData = () => {
    Alert.alert('تصدير البيانات', `سيتم تصدير بيانات ${filteredStores.length} متجر إلى ملف Excel`, [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'تصدير', onPress: () => Alert.alert('تم', 'تم تصدير البيانات بنجاح') }
    ]);
  };

  const getCategoryLabel = (value: string) => {
    const category = categories.find(c => c.value === value);
    return category ? category.label : 'جميع التخطيط';
  };

  const getStatusLabel = (value: string) => {
    const status = statusOptions.find(s => s.value === value);
    return status ? status.label : 'جميع الحالات';
  };

  const renderCategoryModal = () => (
    <Modal visible={showCategoryModal} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>اختر التخطيط</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.value}
              style={[styles.modalOption, selectedCategory === category.value && styles.selectedModalOption]}
              onPress={() => {
                setSelectedCategory(category.value);
                setShowCategoryModal(false);
              }}
            >
              <Text style={[styles.modalOptionText, selectedCategory === category.value && styles.selectedModalOptionText]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowCategoryModal(false)}
          >
            <Text style={styles.modalCloseText}>إغلاق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderStatusModal = () => (
    <Modal visible={showStatusModal} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>اختر الحالة</Text>
          {statusOptions.map((status) => (
            <TouchableOpacity
              key={status.value}
              style={[styles.modalOption, selectedStatus === status.value && styles.selectedModalOption]}
              onPress={() => {
                setSelectedStatus(status.value);
                setShowStatusModal(false);
              }}
            >
              <Text style={[styles.modalOptionText, selectedStatus === status.value && styles.selectedModalOptionText]}>
                {status.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowStatusModal(false)}
          >
            <Text style={styles.modalCloseText}>إغلاق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.right" size={20} color="#1f2937" />
            <Text style={styles.backText}>العودة</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>إدارة المتاجر المتقدمة</Text>
          <Text style={styles.headerSubtitle}>التحكم الكامل ومراقبة لصحاب المتاجر إضافة المتاجر</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.exportButton} onPress={exportData}>
            <IconSymbol name="square.and.arrow.down.fill" size={16} color="#1f2937" />
            <Text style={styles.exportText}>تصدير البيانات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton} onPress={() => Alert.alert('الإعدادات', 'قيد التطوير')}>
            <IconSymbol name="gearshape.fill" size={20} color="#1f2937" />
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
          style={[styles.actionButton, styles.activeButton]} 
          onPress={() => handleQuickAction('manage')}
        >
          <Text style={styles.activeButtonText}>إدارة المتاجر</Text>
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
          style={[styles.actionButton, styles.inactiveButton]} 
          onPress={() => handleQuickAction('orders')}
        >
          <Text style={styles.inactiveButtonText}>الطلبات المعتمدة</Text>
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
            <TouchableOpacity
              style={styles.filterDropdown}
              onPress={() => setShowStatusModal(true)}
            >
              <Text style={styles.filterText}>{getStatusLabel(selectedStatus)}</Text>
              <IconSymbol name="chevron.down" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.filterGroup}>
            <TouchableOpacity
              style={styles.filterDropdown}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={styles.filterText}>{getCategoryLabel(selectedCategory)}</Text>
              <IconSymbol name="chevron.down" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.resultCount}>{filteredStores.length} متاجر</Text>
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
                      <IconSymbol name="crown.fill" size={12} color="#f59e0b" />
                    </View>
                  )}
                </View>
                <Text style={styles.storeOwner}>{store.owner}</Text>
                <Text style={styles.storeLocation}>{store.location}</Text>
              </View>
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => Alert.alert('المزيد', 'خيارات إضافية قيد التطوير')}
              >
                <IconSymbol name="ellipsis" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Store Tags */}
            <View style={styles.storeTags}>
              <View style={[styles.categoryTag, { backgroundColor: `${getCategoryColor(store.category)}20` }]}>
                <Text style={[styles.categoryText, { color: getCategoryColor(store.category) }]}>
                  {store.category}
                </Text>
              </View>
              <View style={[styles.statusTag, { backgroundColor: `${getStatusColor(store.status)}15` }]}>
                <Text style={[styles.statusText, { color: getStatusColor(store.status) }]}>
                  {getStatusText(store.status)}
                </Text>
              </View>
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
              <IconSymbol name="star.fill" size={14} color="#fbbf24" />
              <Text style={styles.ratingText}>{store.rating}</Text>
              <Text style={styles.ratingCount}>({store.totalOrders})</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.storeActions}>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => handleStoreAction(store, 'details')}
              >
                <IconSymbol name="list.bullet" size={14} color="#6b7280" />
                <Text style={styles.detailsButtonText}>تحديد البيانات</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => handleStoreAction(store, 'contact')}
              >
                <IconSymbol name="message" size={14} color="#6b7280" />
                <Text style={styles.contactButtonText}>تواصل</Text>
              </TouchableOpacity>
            </View>

            {/* Status-specific Actions */}
            {store.status === 'verified' ? (
              <TouchableOpacity style={styles.verifiedButton}>
                <IconSymbol name="checkmark.circle.fill" size={16} color="#fff" />
                <Text style={styles.verifiedButtonText}>متجر موثق</Text>
              </TouchableOpacity>
            ) : store.status === 'pending' ? (
              <TouchableOpacity
                style={styles.pendingButton}
                onPress={() => handleStoreAction(store, 'verify')}
              >
                <IconSymbol name="checkmark" size={16} color="#fff" />
                <Text style={styles.pendingButtonText}>يتطلب موافقة</Text>
              </TouchableOpacity>
            ) : store.status === 'rejected' ? (
              <TouchableOpacity
                style={styles.rejectedButton}
                onPress={() => handleStoreAction(store, 'verify')}
              >
                <IconSymbol name="arrow.clockwise" size={16} color="#fff" />
                <Text style={styles.rejectedButtonText}>إعادة مراجعة</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.suspendedButton}
                onPress={() => handleStoreAction(store, 'verify')}
              >
                <IconSymbol name="play.circle.fill" size={16} color="#fff" />
                <Text style={styles.suspendedButtonText}>إعادة تفعيل</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {filteredStores.length === 0 && (
        <View style={styles.emptyState}>
          <IconSymbol name="building.2" size={48} color="#9ca3af" />
          <Text style={styles.emptyStateText}>لا توجد متاجر مطابقة للبحث</Text>
          <TouchableOpacity style={styles.clearFiltersButton} onPress={() => {
            setSearchQuery('');
            setSelectedCategory('all');
            setSelectedStatus('all');
          }}>
            <Text style={styles.clearFiltersText}>مسح الفلاتر</Text>
          </TouchableOpacity>
        </View>
      )}

      {renderCategoryModal()}
      {renderStatusModal()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  backText: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '600',
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#1f2937',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#6b7280',
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
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  exportText: {
    color: '#1f2937',
    fontSize: 11,
    fontWeight: '600',
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
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
    backgroundColor: '#f9fafb',
    borderBottomWidth: 2,
    borderBottomColor: '#1f2937',
  },
  inactiveButton: {
    backgroundColor: '#f9fafb',
  },
  activeButtonText: {
    fontSize: 11,
    color: '#1f2937',
    fontWeight: '700',
  },
  inactiveButtonText: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '600',
  },
  filtersSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterGroup: {
    flex: 1,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  resultCount: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'center',
  },
  storesGrid: {
    padding: 16,
    gap: 16,
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  storeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  storeInfo: {
    flex: 1,
  },
  storeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  storeName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a202c',
    flex: 1,
    textAlign: 'right',
  },
  vipBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  storeOwner: {
    fontSize: 13,
    color: '#4a5568',
    marginBottom: 4,
    textAlign: 'right',
    fontWeight: '500',
  },
  storeLocation: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'right',
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  storeTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  storeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    marginVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  ratingCount: {
    fontSize: 12,
    color: '#64748b',
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
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    gap: 6,
  },
  detailsButtonText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  contactButton: {
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
  contactButtonText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  verifiedButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  verifiedButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  pendingButton: {
    backgroundColor: '#f59e0b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  pendingButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  rejectedButton: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  rejectedButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  suspendedButton: {
    backgroundColor: '#6b7280',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  suspendedButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  clearFiltersButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearFiltersText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedModalOption: {
    backgroundColor: '#8b5cf6',
  },
  modalOptionText: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedModalOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalCloseButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  modalCloseText: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    fontWeight: '600',
  },
});