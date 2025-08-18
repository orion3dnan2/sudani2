
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Switch, Modal } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface ProductFormData {
  name: string;
  arabicName: string;
  description: string;
  category: string;
  price: string;
  salePrice: string;
  stock: string;
  image: string;
  sku: string;
  weight: string;
  dimensions: string;
  tags: string;
  featured: boolean;
  allowReviews: boolean;
  trackStock: boolean;
  status: 'active' | 'draft';
}

export default function MerchantAddProduct() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    arabicName: '',
    description: '',
    category: '',
    price: '',
    salePrice: '',
    stock: '',
    image: '',
    sku: '',
    weight: '',
    dimensions: '',
    tags: '',
    featured: false,
    allowReviews: true,
    trackStock: true,
    status: 'draft'
  });

  const [showImagePicker, setShowImagePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // نوع المتجر - في التطبيق الحقيقي سيأتي من بيانات المستخدم
  const [storeType, setStoreType] = useState('perfumes'); // افتراضي: متجر عطور

  // فئات حسب نوع المتجر
  const storeCategories = {
    perfumes: [
      'العطور الفرنسية',
      'العطور العربية',
      'المسك',
      'العود',
      'الزيوت العطرية',
      'البخور',
      'عطور نسائية',
      'عطور رجالية',
      'عطور أطفال',
      'أخرى'
    ],
    clothing: [
      'ملابس رجالية',
      'ملابس نسائية',
      'ملابس أطفال',
      'أحذية',
      'حقائب',
      'إكسسوارات',
      'ساعات',
      'مجوهرات',
      'نظارات',
      'أخرى'
    ],
    electronics: [
      'هواتف ذكية',
      'حاسوب وأجهزة لوحية',
      'ألعاب فيديو',
      'كاميرات',
      'سماعات',
      'أجهزة منزلية',
      'إكسسوارات إلكترونية',
      'شواحن وكابلات',
      'أجهزة رياضية ذكية',
      'أخرى'
    ],
    books: [
      'كتب دينية',
      'كتب أدبية',
      'كتب علمية',
      'كتب تاريخية',
      'كتب أطفال',
      'كتب تطوير الذات',
      'كتب طبخ',
      'مجلات',
      'كتب مدرسية',
      'أخرى'
    ],
    food: [
      'مخبوزات',
      'حلويات',
      'مشروبات',
      'توابل وبهارات',
      'معلبات',
      'منتجات طازجة',
      'وجبات جاهزة',
      'منتجات صحية',
      'وجبات خفيفة',
      'أخرى'
    ],
    beauty: [
      'منتجات العناية بالبشرة',
      'مكياج',
      'منتجات الشعر',
      'عطور ومزيل العرق',
      'منتجات الاستحمام',
      'أدوات التجميل',
      'منتجات طبيعية',
      'منتجات الرجال',
      'منتجات الأطفال',
      'أخرى'
    ],
    home: [
      'أثاث',
      'ديكورات',
      'إضاءة',
      'منسوجات منزلية',
      'أدوات مطبخ',
      'أدوات تنظيف',
      'نباتات وحدائق',
      'أدوات كهربائية',
      'منتجات التخزين',
      'أخرى'
    ],
    sports: [
      'ملابس رياضية',
      'أحذية رياضية',
      'معدات لياقة بدنية',
      'معدات كرة القدم',
      'معدات السباحة',
      'معدات الجري',
      'دراجات هوائية',
      'معدات التخييم',
      'مكملات غذائية',
      'أخرى'
    ]
  };

  const storeTypes = [
    { id: 'perfumes', name: 'متجر عطور ومستحضرات', icon: '🌸' },
    { id: 'clothing', name: 'متجر ملابس وأزياء', icon: '👗' },
    { id: 'electronics', name: 'متجر إلكترونيات', icon: '📱' },
    { id: 'books', name: 'مكتبة وكتب', icon: '📚' },
    { id: 'food', name: 'متجر أغذية ومأكولات', icon: '🍯' },
    { id: 'beauty', name: 'متجر تجميل وعناية', icon: '💄' },
    { id: 'home', name: 'متجر منزلي وديكور', icon: '🏠' },
    { id: 'sports', name: 'متجر رياضي', icon: '⚽' }
  ];

  const categories = storeCategories[storeType as keyof typeof storeCategories] || storeCategories.perfumes;

  const emojis = [
    '🌸', '🤍', '🪵', '🌹', '💎', '✨',
    '🌿', '🕯️', '🧴', '💐', '🌺', '🌼',
    '🍃', '🌙', '⭐', '🔮', '🌊', '🌸'
  ];

  const handleBack = () => {
    if (hasUnsavedChanges()) {
      Alert.alert(
        'تغييرات غير محفوظة',
        'لديك تغييرات غير محفوظة. هل تريد المغادرة؟',
        [
          { text: 'البقاء', style: 'cancel' },
          { text: 'المغادرة', onPress: () => router.back(), style: 'destructive' }
        ]
      );
    } else {
      router.back();
    }
  };

  const hasUnsavedChanges = () => {
    return formData.name.trim() !== '' || 
           formData.arabicName.trim() !== '' || 
           formData.description.trim() !== '' ||
           formData.category !== '' ||
           formData.price.trim() !== '' ||
           formData.salePrice.trim() !== '' ||
           formData.stock.trim() !== '' ||
           formData.image !== '' ||
           formData.sku.trim() !== '' ||
           formData.weight.trim() !== '' ||
           formData.dimensions.trim() !== '' ||
           formData.tags.trim() !== '' ||
           formData.featured === true ||
           formData.allowReviews === false ||
           formData.trackStock === false;
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push('اسم المنتج بالإنجليزية مطلوب');
    if (!formData.arabicName.trim()) errors.push('اسم المنتج بالعربية مطلوب');
    if (!formData.price.trim()) errors.push('السعر مطلوب');
    if (!formData.category) errors.push('الفئة مطلوبة');
    if (!formData.stock.trim() && formData.trackStock) errors.push('الكمية مطلوبة');

    if (formData.price && isNaN(parseFloat(formData.price))) {
      errors.push('السعر يجب أن يكون رقماً صحيحاً');
    }

    if (formData.salePrice && isNaN(parseFloat(formData.salePrice))) {
      errors.push('سعر العرض يجب أن يكون رقماً صحيحاً');
    }

    if (formData.stock && isNaN(parseInt(formData.stock))) {
      errors.push('الكمية يجب أن تكون رقماً صحيحاً');
    }

    return errors;
  };

  const handleSave = async (saveAs: 'draft' | 'active') => {
    // للمسودة، لا نحتاج للتحقق من جميع الحقول المطلوبة
    if (saveAs === 'active') {
      const errors = validateForm();
      
      if (errors.length > 0) {
        Alert.alert('خطأ في البيانات', errors.join('\n'));
        return;
      }
    } else {
      // للمسودة، نحتاج فقط اسم المنتج
      if (!formData.name.trim() && !formData.arabicName.trim()) {
        Alert.alert('خطأ', 'يجب إدخال اسم المنتج على الأقل لحفظ المسودة');
        return;
      }
    }

    setIsLoading(true);

    try {
      // محاكاة حفظ المنتج
      await new Promise(resolve => setTimeout(resolve, 1500));

      const productData = {
        ...formData,
        status: saveAs,
        sku: formData.sku || `PRD-${Date.now()}`,
        image: formData.image || '📦',
        dateAdded: new Date().toISOString(),
        id: Date.now()
      };

      console.log('Product saved:', productData);

      Alert.alert(
        'تم بنجاح',
        saveAs === 'draft' ? 'تم حفظ المنتج كمسودة' : 'تم نشر المنتج بنجاح',
        [
          {
            text: 'موافق',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء حفظ المنتج. يرجى المحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDraftSave = () => {
    if (!formData.name.trim() && !formData.arabicName.trim()) {
      Alert.alert('تنبيه', 'يجب إدخال اسم المنتج على الأقل لحفظ المسودة');
      return;
    }
    handleSave('draft');
  };

  const generateSKU = () => {
    const timestamp = Date.now().toString().slice(-6);
    const category = formData.category ? formData.category.slice(0, 3).toUpperCase() : 'PRD';
    const sku = `${category}-${timestamp}`;
    setFormData({ ...formData, sku });
  };

  const renderImagePicker = () => (
    <Modal visible={showImagePicker} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.imagePickerModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>اختر أيقونة المنتج</Text>
            <TouchableOpacity onPress={() => setShowImagePicker(false)}>
              <IconSymbol name="xmark" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.emojiGrid}>
            <View style={styles.emojiContainer}>
              {emojis.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.emojiButton,
                    formData.image === emoji && styles.selectedEmoji
                  ]}
                  onPress={() => {
                    setFormData({ ...formData, image: emoji });
                    setShowImagePicker(false);
                  }}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.right" size={20} color="#fff" />
            <Text style={styles.backText}>رجوع</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>إضافة منتج جديد</Text>
            <Text style={styles.headerSubtitle}>أضف منتج جديد لمتجرك</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.draftButton, isLoading && styles.disabledButton]}
              onPress={handleDraftSave}
              disabled={isLoading}
            >
              <Text style={[styles.draftButtonText, isLoading && styles.disabledButtonText]}>
                {isLoading ? 'جاري الحفظ...' : 'مسودة'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📷 صور المنتج</Text>
          
          <View style={styles.imageSection}>
            <TouchableOpacity
              style={styles.mainImageUpload}
              onPress={() => setShowImagePicker(true)}
            >
              {formData.image ? (
                <Text style={styles.selectedImageEmoji}>{formData.image}</Text>
              ) : (
                <>
                  <IconSymbol name="camera.fill" size={32} color="#6b7280" />
                  <Text style={styles.uploadText}>اختر أيقونة المنتج</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Store Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏪 نوع المتجر</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.storeTypeContainer}>
              {storeTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.storeTypeChip,
                    storeType === type.id && styles.selectedStoreType
                  ]}
                  onPress={() => {
                    setStoreType(type.id);
                    // إعادة تعيين الفئة المختارة عند تغيير نوع المتجر
                    setFormData({ ...formData, category: '' });
                  }}
                >
                  <Text style={styles.storeTypeEmoji}>{type.icon}</Text>
                  <Text style={[
                    styles.storeTypeText,
                    storeType === type.id && styles.selectedStoreTypeText
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 المعلومات الأساسية</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>اسم المنتج (بالإنجليزية) *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="مثال: Sandalwood Perfume"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>اسم المنتج (بالعربية) *</Text>
            <TextInput
              style={[styles.textInput, styles.arabicInput]}
              value={formData.arabicName}
              onChangeText={(text) => setFormData({ ...formData, arabicName: text })}
              placeholder="مثال: عطر صندل بجدائي"
              placeholderTextColor="#9ca3af"
              textAlign="right"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>وصف المنتج</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="وصف تفصيلي للمنتج وفوائده ومميزاته..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              textAlign="right"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              الفئة * 
              <Text style={styles.categoryNote}>
                (حسب نوع المتجر: {storeTypes.find(t => t.id === storeType)?.name})
              </Text>
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      formData.category === category && styles.selectedCategory
                    ]}
                    onPress={() => setFormData({ ...formData, category })}
                  >
                    <Text style={[
                      styles.categoryText,
                      formData.category === category && styles.selectedCategoryText
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 الأسعار والمخزون</Text>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.inputLabel}>السعر الأساسي (ريال) *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.price}
                onChangeText={(text) => setFormData({ ...formData, price: text })}
                placeholder="150"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.inputLabel}>سعر العرض (ريال)</Text>
              <TextInput
                style={styles.textInput}
                value={formData.salePrice}
                onChangeText={(text) => setFormData({ ...formData, salePrice: text })}
                placeholder="120"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.switchContainer}>
            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>تتبع المخزون</Text>
              <Switch
                value={formData.trackStock}
                onValueChange={(value) => setFormData({ ...formData, trackStock: value })}
                trackColor={{ false: '#e5e7eb', true: '#10b981' }}
                thumbColor={formData.trackStock ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>

          {formData.trackStock && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>الكمية المتوفرة *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.stock}
                onChangeText={(text) => setFormData({ ...formData, stock: text })}
                placeholder="25"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 تفاصيل إضافية</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>رمز المنتج (SKU)</Text>
            <View style={styles.skuContainer}>
              <TextInput
                style={[styles.textInput, styles.skuInput]}
                value={formData.sku}
                onChangeText={(text) => setFormData({ ...formData, sku: text })}
                placeholder="سيتم إنشاؤه تلقائياً"
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity style={styles.generateButton} onPress={generateSKU}>
                <Text style={styles.generateButtonText}>إنشاء</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.inputLabel}>الوزن (جرام)</Text>
              <TextInput
                style={styles.textInput}
                value={formData.weight}
                onChangeText={(text) => setFormData({ ...formData, weight: text })}
                placeholder="50"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.inputLabel}>الأبعاد (سم)</Text>
              <TextInput
                style={styles.textInput}
                value={formData.dimensions}
                onChangeText={(text) => setFormData({ ...formData, dimensions: text })}
                placeholder="10x5x15"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>الكلمات المفتاحية</Text>
            <TextInput
              style={styles.textInput}
              value={formData.tags}
              onChangeText={(text) => setFormData({ ...formData, tags: text })}
              placeholder="عطر، صندل، طبيعي، فاخر"
              placeholderTextColor="#9ca3af"
              textAlign="right"
            />
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ الإعدادات</Text>

          <View style={styles.switchContainer}>
            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>منتج مميز</Text>
              <Switch
                value={formData.featured}
                onValueChange={(value) => setFormData({ ...formData, featured: value })}
                trackColor={{ false: '#e5e7eb', true: '#f59e0b' }}
                thumbColor={formData.featured ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>السماح بالتقييمات</Text>
              <Switch
                value={formData.allowReviews}
                onValueChange={(value) => setFormData({ ...formData, allowReviews: value })}
                trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                thumbColor={formData.allowReviews ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.publishButton]}
            onPress={() => handleSave('active')}
            disabled={isLoading}
          >
            <IconSymbol name="checkmark.circle.fill" size={20} color="#fff" />
            <Text style={styles.publishButtonText}>
              {isLoading ? 'جاري النشر...' : 'نشر المنتج'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={() => handleSave('draft')}
            disabled={isLoading}
          >
            <IconSymbol name="doc.fill" size={20} color="#6b7280" />
            <Text style={styles.saveButtonText}>حفظ كمسودة</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {renderImagePicker()}
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  headerActions: {
    minWidth: 60,
    alignItems: 'flex-end',
  },
  draftButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  draftButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'right',
  },
  imageSection: {
    alignItems: 'center',
  },
  mainImageUpload: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImageEmoji: {
    fontSize: 48,
  },
  uploadText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'right',
  },
  textInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1f2937',
  },
  arabicInput: {
    textAlign: 'right',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
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
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  storeTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 4,
  },
  storeTypeChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    minWidth: 120,
  },
  selectedStoreType: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  storeTypeEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  storeTypeText: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedStoreTypeText: {
    color: '#fff',
  },
  categoryNote: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: 'normal',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  switchContainer: {
    gap: 16,
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  switchLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  skuContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  skuInput: {
    flex: 1,
  },
  generateButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  publishButton: {
    backgroundColor: '#10b981',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  saveButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerModal: {
    width: '90%',
    maxHeight: '70%',
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
  emojiGrid: {
    maxHeight: 300,
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  emojiButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedEmoji: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  emojiText: {
    fontSize: 24,
  },
});
