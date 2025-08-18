
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface Product {
  id: number;
  name: string;
  arabicName: string;
  description: string;
  category: string;
  price: number;
  salePrice?: number;
  stock: number;
  image: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  featured: boolean;
  sku: string;
  dateAdded: string;
  sales: number;
}

export default function MerchantProducts() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [newProduct, setNewProduct] = useState({
    name: '',
    arabicName: '',
    description: '',
    category: '',
    price: '',
    salePrice: '',
    stock: '',
    image: '',
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Sandalwood Perfume',
      arabicName: 'عطر صندل بجدائي',
      description: 'عطر صندل طبيعي بجودة عالية من أفضل أنواع الصندل',
      category: 'العطور',
      price: 150,
      salePrice: 120,
      stock: 25,
      image: '🌸',
      status: 'active',
      featured: true,
      sku: 'SAND-001',
      dateAdded: '2024-01-15',
      sales: 45
    },
    {
      id: 2,
      name: 'White Musk',
      arabicName: 'مسك أبيض طبيعي',
      description: 'مسك أبيض طبيعي برائحة جميلة ومميزة',
      category: 'المسك',
      price: 85,
      stock: 12,
      image: '🤍',
      status: 'active',
      featured: false,
      sku: 'MUSK-002',
      dateAdded: '2024-01-10',
      sales: 32
    },
    {
      id: 3,
      name: 'Cambodian Oud',
      arabicName: 'عود كمبودي فاخر',
      description: 'عود كمبودي أصلي من أجود الأنواع',
      category: 'العود',
      price: 450,
      stock: 5,
      image: '🪵',
      status: 'active',
      featured: true,
      sku: 'OUD-003',
      dateAdded: '2024-01-12',
      sales: 18
    },
    {
      id: 4,
      name: 'Rose Oil',
      arabicName: 'زيت ورد طائفي',
      description: 'زيت ورد طائفي أصلي عالي الجودة',
      category: 'الزيوت',
      price: 200,
      stock: 0,
      image: '🌹',
      status: 'out_of_stock',
      featured: false,
      sku: 'ROSE-004',
      dateAdded: '2024-01-08',
      sales: 28
    }
  ]);

  const categories = ['العطور', 'المسك', 'العود', 'الزيوت', 'البخور', 'أخرى'];
  
  const filters = [
    { key: 'all', label: 'جميع المنتجات', count: products.length },
    { key: 'active', label: 'نشط', count: products.filter(p => p.status === 'active').length },
    { key: 'inactive', label: 'غير نشط', count: products.filter(p => p.status === 'inactive').length },
    { key: 'out_of_stock', label: 'نفذ المخزون', count: products.filter(p => p.status === 'out_of_stock').length },
    { key: 'featured', label: 'مميز', count: products.filter(p => p.featured).length },
  ];

  const filteredProducts = products.filter(product => {
    const matchesFilter = selectedFilter === 'all' || 
                         product.status === selectedFilter || 
                         (selectedFilter === 'featured' && product.featured);
    
    const matchesSearch = searchQuery === '' || 
                         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.arabicName.includes(searchQuery);
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'out_of_stock': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'out_of_stock': return 'نفذ المخزون';
      default: return status;
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      Alert.alert('خطأ', 'يرجى ملء الحقول المطلوبة');
      return;
    }

    const product: Product = {
      id: products.length + 1,
      name: newProduct.name,
      arabicName: newProduct.arabicName,
      description: newProduct.description,
      category: newProduct.category || 'أخرى',
      price: parseFloat(newProduct.price),
      salePrice: newProduct.salePrice ? parseFloat(newProduct.salePrice) : undefined,
      stock: parseInt(newProduct.stock) || 0,
      image: newProduct.image || '📦',
      status: 'active',
      featured: false,
      sku: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      dateAdded: new Date().toISOString().split('T')[0],
      sales: 0
    };

    setProducts([...products, product]);
    setShowAddModal(false);
    setNewProduct({ name: '', arabicName: '', description: '', category: '', price: '', salePrice: '', stock: '', image: '' });
    Alert.alert('نجح', 'تم إضافة المنتج بنجاح');
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      arabicName: product.arabicName,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      salePrice: product.salePrice?.toString() || '',
      stock: product.stock.toString(),
      image: product.image,
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = () => {
    if (!newProduct.name || !newProduct.price || !selectedProduct) {
      Alert.alert('خطأ', 'يرجى ملء الحقول المطلوبة');
      return;
    }

    const updatedProducts = products.map(product => 
      product.id === selectedProduct.id 
        ? {
            ...product,
            name: newProduct.name,
            arabicName: newProduct.arabicName,
            description: newProduct.description,
            category: newProduct.category || 'أخرى',
            price: parseFloat(newProduct.price),
            salePrice: newProduct.salePrice ? parseFloat(newProduct.salePrice) : undefined,
            stock: parseInt(newProduct.stock) || 0,
            image: newProduct.image || '📦',
            status: parseInt(newProduct.stock) > 0 ? 'active' : 'out_of_stock'
          }
        : product
    );

    setProducts(updatedProducts);
    setShowEditModal(false);
    setSelectedProduct(null);
    setNewProduct({ name: '', arabicName: '', description: '', category: '', price: '', salePrice: '', stock: '', image: '' });
    Alert.alert('نجح', 'تم تحديث المنتج بنجاح');
  };

  const handleDeleteProduct = (productId: number) => {
    Alert.alert(
      'حذف المنتج',
      'هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'حذف', 
          style: 'destructive',
          onPress: () => {
            setProducts(products.filter(p => p.id !== productId));
            Alert.alert('نجح', 'تم حذف المنتج بنجاح');
          }
        }
      ]
    );
  };

  const toggleProductStatus = (productId: number) => {
    const updatedProducts = products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            status: product.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' | 'out_of_stock'
          }
        : product
    );
    setProducts(updatedProducts);
  };

  const toggleFeatured = (productId: number) => {
    const updatedProducts = products.map(product => 
      product.id === productId 
        ? { ...product, featured: !product.featured }
        : product
    );
    setProducts(updatedProducts);
  };

  const renderProductModal = () => (
    <Modal visible={showAddModal || showEditModal} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setSelectedProduct(null);
              }}
            >
              <IconSymbol name="house.fill" size={24} color="#6b7280" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {showAddModal ? 'إضافة منتج جديد' : 'تعديل المنتج'}
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>اسم المنتج بالإنجليزية *</Text>
              <TextInput
                style={styles.textInput}
                value={newProduct.name}
                onChangeText={(text) => setNewProduct({...newProduct, name: text})}
                placeholder="مثال: Sandalwood Perfume"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>اسم المنتج بالعربية *</Text>
              <TextInput
                style={styles.textInput}
                value={newProduct.arabicName}
                onChangeText={(text) => setNewProduct({...newProduct, arabicName: text})}
                placeholder="مثال: عطر صندل بجدائي"
                textAlign="right"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>الوصف</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={newProduct.description}
                onChangeText={(text) => setNewProduct({...newProduct, description: text})}
                placeholder="وصف تفصيلي للمنتج..."
                multiline
                numberOfLines={3}
                textAlign="right"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>الفئة</Text>
              <View style={styles.categoryContainer}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      newProduct.category === category && styles.selectedCategory
                    ]}
                    onPress={() => setNewProduct({...newProduct, category})}
                  >
                    <Text style={[
                      styles.categoryText,
                      newProduct.category === category && styles.selectedCategoryText
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>السعر الأساسي *</Text>
                <TextInput
                  style={styles.textInput}
                  value={newProduct.price}
                  onChangeText={(text) => setNewProduct({...newProduct, price: text})}
                  placeholder="150"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>سعر العرض</Text>
                <TextInput
                  style={styles.textInput}
                  value={newProduct.salePrice}
                  onChangeText={(text) => setNewProduct({...newProduct, salePrice: text})}
                  placeholder="120"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>الكمية في المخزون *</Text>
              <TextInput
                style={styles.textInput}
                value={newProduct.stock}
                onChangeText={(text) => setNewProduct({...newProduct, stock: text})}
                placeholder="25"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>رمز المنتج (إيموجي)</Text>
              <TextInput
                style={styles.textInput}
                value={newProduct.image}
                onChangeText={(text) => setNewProduct({...newProduct, image: text})}
                placeholder="🌸"
              />
            </View>
          </ScrollView>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setSelectedProduct(null);
              }}
            >
              <Text style={styles.cancelButtonText}>إلغاء</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={showAddModal ? handleAddProduct : handleUpdateProduct}
            >
              <Text style={styles.saveButtonText}>
                {showAddModal ? 'إضافة المنتج' : 'حفظ التغييرات'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.right" size={20} color="#fff" />
            <Text style={styles.backText}>رجوع</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>إدارة المنتجات</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/merchant-add-product')}
          >
            <IconSymbol name="house.fill" size={16} color="#fff" />
            <Text style={styles.addButtonText}>إضافة</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Search and View Options */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={16} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="البحث في المنتجات..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
          />
        </View>

        <View style={styles.viewOptions}>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'grid' && styles.activeViewButton]}
            onPress={() => setViewMode('grid')}
          >
            <IconSymbol name="house.fill" size={16} color={viewMode === 'grid' ? '#10b981' : '#6b7280'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'list' && styles.activeViewButton]}
            onPress={() => setViewMode('list')}
          >
            <IconSymbol name="chevron.right" size={16} color={viewMode === 'list' ? '#10b981' : '#6b7280'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              selectedFilter === filter.key && styles.activeFilterTab
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.key && styles.activeFilterText
            ]}>
              {filter.label} ({filter.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products List */}
      <ScrollView style={styles.productsContainer}>
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📦</Text>
            <Text style={styles.emptyStateTitle}>لا توجد منتجات</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'لم يتم العثور على منتجات مطابقة لبحثك' : 'ابدأ بإضافة منتجات لمتجرك'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                style={styles.addFirstProductButton}
                onPress={() => router.push('/merchant-add-product')}
              >
                <Text style={styles.addFirstProductText}>إضافة أول منتج</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={viewMode === 'grid' ? styles.productsGrid : styles.productsList}>
            {filteredProducts.map(product => (
              <View key={product.id} style={viewMode === 'grid' ? styles.productCard : styles.productRow}>
                <View style={styles.productHeader}>
                  <View style={styles.productImage}>
                    <Text style={styles.productEmoji}>{product.image}</Text>
                  </View>
                  
                  <View style={styles.productActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => toggleFeatured(product.id)}
                    >
                      <IconSymbol 
                        name="house.fill" 
                        size={14} 
                        color={product.featured ? '#f59e0b' : '#d1d5db'} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.arabicName}</Text>
                  <Text style={styles.productNameEn}>{product.name}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>

                  <View style={styles.productPricing}>
                    {product.salePrice ? (
                      <>
                        <Text style={styles.salePrice}>{product.salePrice} ريال</Text>
                        <Text style={styles.originalPrice}>{product.price} ريال</Text>
                      </>
                    ) : (
                      <Text style={styles.price}>{product.price} ريال</Text>
                    )}
                  </View>

                  <View style={styles.productMeta}>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(product.status)}20` }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(product.status) }]}>
                        {getStatusText(product.status)}
                      </Text>
                    </View>
                    <Text style={styles.stockText}>المخزون: {product.stock}</Text>
                  </View>

                  <View style={styles.productStats}>
                    <Text style={styles.statText}>المبيعات: {product.sales}</Text>
                    <Text style={styles.statText}>كود: {product.sku}</Text>
                  </View>
                </View>

                <View style={styles.productButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditProduct(product)}
                  >
                    <IconSymbol name="house.fill" size={14} color="#3b82f6" />
                    <Text style={styles.editButtonText}>تعديل</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.statusButton, { 
                      backgroundColor: product.status === 'active' ? '#ef4444' : '#10b981' 
                    }]}
                    onPress={() => toggleProductStatus(product.id)}
                  >
                    <Text style={styles.statusButtonText}>
                      {product.status === 'active' ? 'إيقاف' : 'تفعيل'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteProduct(product.id)}
                  >
                    <IconSymbol name="house.fill" size={14} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {renderProductModal()}
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
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    color: '#fff',
    fontSize: 14,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    textAlign: 'right',
  },
  viewOptions: {
    flexDirection: 'row',
    gap: 4,
  },
  viewButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeViewButton: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeFilterTab: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  filterText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  productsContainer: {
    flex: 1,
    padding: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productsList: {
    gap: 12,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  productRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productEmoji: {
    fontSize: 20,
  },
  productActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    padding: 4,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'right',
    marginBottom: 2,
  },
  productNameEn: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'right',
    marginBottom: 8,
  },
  productPricing: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  salePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  originalPrice: {
    fontSize: 12,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  stockText: {
    fontSize: 10,
    color: '#6b7280',
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statText: {
    fontSize: 10,
    color: '#9ca3af',
  },
  productButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    backgroundColor: '#eff6ff',
    borderRadius: 6,
    gap: 4,
  },
  editButtonText: {
    fontSize: 11,
    color: '#3b82f6',
    fontWeight: '500',
  },
  statusButton: {
    flex: 1,
    alignItems: 'center',
    padding: 6,
    borderRadius: 6,
  },
  statusButtonText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 6,
    backgroundColor: '#fef2f2',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  addFirstProductButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstProductText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalBody: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
    textAlign: 'right',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlign: 'right',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCategory: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  categoryText: {
    fontSize: 12,
    color: '#6b7280',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#10b981',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
