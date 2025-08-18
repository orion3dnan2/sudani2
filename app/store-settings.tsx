
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

export default function StoreSettings() {
  const [storeInfo, setStoreInfo] = useState({
    storeName: 'متجر الفر',
    storeDescription: 'متجر متخصص في بيع المنتجات الرقمية والأزياء',
    email: 'store@example.com',
    phone: '+966501234567',
    city: 'الرياض، المملكة العربية السعودية',
    address: 'شارع الملك عبدالله، حي الملك فهد، الرياض'
  });

  const [workingHours, setWorkingHours] = useState({
    fromTime: '09:00 AM',
    toTime: '10:00 PM'
  });

  const [workingDays, setWorkingDays] = useState({
    saturday: true,
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: false
  });

  const handleBack = () => {
    router.back();
  };

  const handleSaveSettings = () => {
    // منطق حفظ الإعدادات
    alert('تم حفظ الإعدادات بنجاح');
  };

  const handleChangeImage = () => {
    // منطق تغيير صورة المتجر
    alert('تم تغيير الصورة');
  };

  const handleChangeStoreImage = () => {
    // منطق تغيير صورة غلاف المتجر
    alert('تم تغيير صورة الغلاف');
  };

  const toggleWorkingDay = (day: string) => {
    setWorkingDays(prev => ({
      ...prev,
      [day]: !prev[day as keyof typeof prev]
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.right" size={20} color="#fff" />
            <Text style={styles.backText}>common.back</Text>
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <View style={styles.settingsIcon}>
              <IconSymbol name="house.fill" size={24} color="#fff" />
            </View>
            <Text style={styles.headerTitle}>إعدادات المتجر</Text>
            <Text style={styles.headerSubtitle}>إدارة معلومات وإعدادات متجرك</Text>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
            <Text style={styles.saveText}>حفظ</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>

      <View style={styles.content}>
        {/* Store Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 معلومات المتجر</Text>
          
          <View style={styles.storeImagesContainer}>
            {/* Store Logo */}
            <View style={styles.storeImageGroup}>
              <Text style={styles.imageLabel}>شعار المتجر</Text>
              <View style={styles.imageUploadContainer}>
                <View style={styles.imagePreview}>
                  <IconSymbol name="paperplane.fill" size={40} color="#8b5cf6" />
                </View>
                <TouchableOpacity style={styles.changeImageButton} onPress={handleChangeImage}>
                  <Text style={styles.changeImageText}>تغيير الصورة</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Store Cover */}
            <View style={styles.storeImageGroup}>
              <Text style={styles.imageLabel}>غلاف المتجر</Text>
              <View style={styles.imageUploadContainer}>
                <View style={styles.imagePreview}>
                  <IconSymbol name="house.fill" size={40} color="#8b5cf6" />
                </View>
                <TouchableOpacity style={styles.changeImageButton} onPress={handleChangeStoreImage}>
                  <Text style={styles.changeImageText}>تغيير الصورة</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Store Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>اسم المتجر</Text>
            <TextInput
              style={styles.textInput}
              value={storeInfo.storeName}
              onChangeText={(text) => setStoreInfo({...storeInfo, storeName: text})}
              placeholder="مثال: متجر الكترونيات"
            />
          </View>

          {/* Store Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>وصف المتجر</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={storeInfo.storeDescription}
              onChangeText={(text) => setStoreInfo({...storeInfo, storeDescription: text})}
              placeholder="متجر متخصص في بيع المنتجات الرقمية والأزياء والمكينة وتجهيز محتوى رقمي"
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Contact Information */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>البريد الإلكتروني</Text>
            <TextInput
              style={styles.textInput}
              value={storeInfo.email}
              onChangeText={(text) => setStoreInfo({...storeInfo, email: text})}
              placeholder="store@example.com"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>رقم الهاتف</Text>
            <TextInput
              style={styles.textInput}
              value={storeInfo.phone}
              onChangeText={(text) => setStoreInfo({...storeInfo, phone: text})}
              placeholder="+966501234567"
              keyboardType="phone-pad"
            />
          </View>

          {/* Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>المدينة</Text>
            <TextInput
              style={styles.textInput}
              value={storeInfo.city}
              onChangeText={(text) => setStoreInfo({...storeInfo, city: text})}
              placeholder="الرياض، المملكة العربية السعودية"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>عنوان المتجر</Text>
            <TextInput
              style={styles.textInput}
              value={storeInfo.address}
              onChangeText={(text) => setStoreInfo({...storeInfo, address: text})}
              placeholder="شارع الملك عبدالله، حي الملك فهد"
            />
          </View>
        </View>

        {/* Working Hours Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ساعات العمل</Text>
          
          <View style={styles.workingHoursContainer}>
            <View style={styles.timeInputGroup}>
              <Text style={styles.timeLabel}>من الساعة</Text>
              <TouchableOpacity style={styles.timeInput}>
                <Text style={styles.timeText}>{workingHours.fromTime}</Text>
                <IconSymbol name="chevron.right" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.timeInputGroup}>
              <Text style={styles.timeLabel}>إلى الساعة</Text>
              <TouchableOpacity style={styles.timeInput}>
                <Text style={styles.timeText}>{workingHours.toTime}</Text>
                <IconSymbol name="chevron.right" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Working Days */}
          <Text style={styles.workingDaysTitle}>أيام العمل</Text>
          <View style={styles.workingDaysContainer}>
            {Object.entries(workingDays).map(([day, isActive]) => {
              const dayNames = {
                saturday: 'السبت',
                sunday: 'الأحد',
                monday: 'الاثنين',
                tuesday: 'الثلاثاء',
                wednesday: 'الأربعاء',
                thursday: 'الخميس',
                friday: 'الجمعة'
              };
              
              return (
                <View key={day} style={styles.workingDayItem}>
                  <Text style={[styles.dayName, isActive && styles.activeDayName]}>
                    {dayNames[day as keyof typeof dayNames]}
                  </Text>
                  <Switch
                    value={isActive}
                    onValueChange={() => toggleWorkingDay(day)}
                    trackColor={{ false: '#e5e7eb', true: '#8b5cf6' }}
                    thumbColor={isActive ? '#fff' : '#f4f3f4'}
                  />
                </View>
              );
            })}
          </View>
        </View>

        {/* Sidebar Actions */}
        <View style={styles.sidebarActions}>
          <TouchableOpacity style={styles.sidebarAction}>
            <IconSymbol name="house.fill" size={20} color="#8b5cf6" />
            <Text style={styles.sidebarActionText}>معلومات المتجر</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarAction}>
            <IconSymbol name="paperplane.fill" size={20} color="#6b7280" />
            <Text style={[styles.sidebarActionText, styles.inactiveAction]}>الإشعارات</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarAction}>
            <IconSymbol name="chevron.right" size={20} color="#6b7280" />
            <Text style={[styles.sidebarActionText, styles.inactiveAction]}>التحليل والتقييم</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarAction}>
            <IconSymbol name="house.fill" size={20} color="#6b7280" />
            <Text style={[styles.sidebarActionText, styles.inactiveAction]}>الحسابات والتأمين</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveChangesButton} onPress={handleSaveSettings}>
          <Text style={styles.saveChangesText}>حفظ التغييرات</Text>
        </TouchableOpacity>
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
    backgroundColor: '#8b5cf6',
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
    gap: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 14,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  settingsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'right',
  },
  storeImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  storeImageGroup: {
    flex: 1,
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  imageUploadContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  changeImageButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  changeImageText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
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
    textAlign: 'right',
    color: '#1f2937',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  workingHoursContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  timeInputGroup: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  timeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  timeText: {
    fontSize: 14,
    color: '#1f2937',
  },
  workingDaysTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    textAlign: 'right',
  },
  workingDaysContainer: {
    gap: 8,
  },
  workingDayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  dayName: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeDayName: {
    color: '#1f2937',
    fontWeight: '600',
  },
  sidebarActions: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sidebarAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 12,
  },
  sidebarActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8b5cf6',
  },
  inactiveAction: {
    color: '#6b7280',
  },
  saveChangesButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveChangesText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
