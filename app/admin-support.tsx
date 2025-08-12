
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface SupportTicket {
  id: number;
  title: string;
  description: string;
  store: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  date: string;
}

export default function AdminSupport() {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 1,
      title: 'مشكلة في عرض المنتجات في متجر الخرطوم السوداني',
      description: 'لا يمكن عرض المنتجات في الصفحة الرئيسية',
      store: 'متجر الخرطوم السوداني',
      status: 'open',
      priority: 'high',
      date: 'منذ يوم',
    },
    {
      id: 2,
      title: 'طلب تفعيل المتجر للعطور السودانية الأصيلة',
      description: 'أريد تفعيل متجري ولكن الطلب معلق منذ أيام',
      store: 'العطور السودانية الأصيلة',
      status: 'in_progress',
      priority: 'medium',
      date: 'منذ 3 أيام',
    },
    {
      id: 3,
      title: 'استفسار حول سياسة الأرجاع للألبسة التراثية',
      description: 'ما هي سياسة الارجاع المعتمدة في الموقع',
      store: 'الألبسة التراثية',
      status: 'resolved',
      priority: 'low',
      date: 'منذ 5 أيام',
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

  const supportActions = [
    { id: 1, title: 'إعلام الجميع', icon: 'speaker.wave.2.fill', action: 'notify_all' },
    { id: 2, title: 'رسالة جماعية', icon: 'envelope.fill', action: 'group_message' },
    { id: 3, title: 'إعلان عروض خاص', icon: 'tag.fill', action: 'special_offer' },
    { id: 4, title: 'إجتماع تقني', icon: 'video.fill', action: 'tech_meeting' },
    { id: 5, title: 'تدريب مخصص', icon: 'graduationcap.fill', action: 'custom_training' },
  ];

  const handleBack = () => {
    router.back();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return '#ef4444';
      case 'in_progress':
        return '#f59e0b';
      case 'resolved':
        return '#10b981';
      case 'closed':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'مفتوح';
      case 'in_progress':
        return 'قيد المعالجة';
      case 'resolved':
        return 'محلول';
      case 'closed':
        return 'مغلق';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return '#dc2626';
      case 'high':
        return '#ea580c';
      case 'medium':
        return '#ca8a04';
      case 'low':
        return '#65a30d';
      default:
        return '#6b7280';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'عاجل';
      case 'high':
        return 'مرتفع';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'منخفض';
      default:
        return priority;
    }
  };

  const handleTicketAction = (ticket: SupportTicket, action: string) => {
    const updatedTickets = tickets.map(t => {
      if (t.id === ticket.id) {
        switch (action) {
          case 'resolve':
            return { ...t, status: 'resolved' as const };
          case 'progress':
            return { ...t, status: 'in_progress' as const };
          case 'close':
            return { ...t, status: 'closed' as const };
          default:
            return t;
        }
      }
      return t;
    });

    switch (action) {
      case 'resolve':
        setTickets(updatedTickets);
        Alert.alert('تم', `تم حل التذكرة "${ticket.title}"`);
        break;
      case 'progress':
        setTickets(updatedTickets);
        Alert.alert('تم', 'تم تحديث حالة التذكرة إلى "قيد المعالجة"');
        break;
      case 'close':
        Alert.alert('تأكيد الإغلاق', 'هل تريد إغلاق هذه التذكرة؟', [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'إغلاق', onPress: () => {
            setTickets(updatedTickets);
            Alert.alert('تم', 'تم إغلاق التذكرة');
          }, style: 'destructive' },
        ]);
        break;
      case 'reply':
        Alert.alert('الرد على التذكرة', `سيتم فتح محرر الرد للتذكرة "${ticket.title}"`);
        break;
      default:
        break;
    }
  };

  const handleSupportAction = (action: string) => {
    switch (action) {
      case 'notify_all':
        Alert.alert('إعلام الجميع', 'سيتم إرسال إعلام لجميع أصحاب المتاجر');
        break;
      case 'group_message':
        Alert.alert('رسالة جماعية', 'سيتم فتح محرر الرسائل الجماعية');
        break;
      case 'special_offer':
        Alert.alert('إعلان عروض خاص', 'سيتم فتح محرر الإعلانات');
        break;
      case 'tech_meeting':
        Alert.alert('اجتماع تقني', 'سيتم جدولة اجتماع تقني');
        break;
      case 'custom_training':
        Alert.alert('تدريب مخصص', 'سيتم إعداد جلسة تدريب مخصصة');
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
        Alert.alert('الدعم والمساعدة', 'أنت في شاشة الدعم والمساعدة حالياً');
        break;
      case 'orders':
        router.push('/admin-orders');
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
          style={[styles.actionButton, styles.activeButton]} 
          onPress={() => handleQuickAction('support')}
        >
          <Text style={styles.activeButtonText}>الدعم والمساعدة</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.inactiveButton]} 
          onPress={() => handleQuickAction('orders')}
        >
          <Text style={styles.inactiveButtonText}>الطلبات المعتمدة</Text>
        </TouchableOpacity>
      </View>

      {/* Support Actions */}
      <View style={styles.supportActionsContainer}>
        <Text style={styles.sectionTitle}>إجراءات سريعة</Text>
        <View style={styles.supportActionsGrid}>
          {supportActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.supportActionButton}
              onPress={() => handleSupportAction(action.action)}
            >
              <IconSymbol name={action.icon} size={20} color="#8b5cf6" />
              <Text style={styles.supportActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Support Tickets */}
      <View style={styles.ticketsContainer}>
        <Text style={styles.sectionTitle}>تذاكر الدعم</Text>
        
        {tickets.map((ticket) => (
          <View key={ticket.id} style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <View style={styles.ticketInfo}>
                <Text style={styles.ticketTitle}>{ticket.title}</Text>
                <Text style={styles.ticketStore}>المتجر: {ticket.store}</Text>
                <Text style={styles.ticketDate}>{ticket.date}</Text>
              </View>
              <View style={styles.ticketBadges}>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(ticket.status)}15` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(ticket.status) }]}>
                    {getStatusText(ticket.status)}
                  </Text>
                </View>
                <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(ticket.priority)}15` }]}>
                  <Text style={[styles.priorityText, { color: getPriorityColor(ticket.priority) }]}>
                    {getPriorityText(ticket.priority)}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.ticketDescription}>{ticket.description}</Text>

            <View style={styles.ticketActions}>
              {ticket.status === 'open' && (
                <TouchableOpacity
                  style={styles.progressButton}
                  onPress={() => handleTicketAction(ticket, 'progress')}
                >
                  <IconSymbol name="arrow.right.circle.fill" size={16} color="#fff" />
                  <Text style={styles.progressButtonText}>قيد المعالجة</Text>
                </TouchableOpacity>
              )}

              {(ticket.status === 'open' || ticket.status === 'in_progress') && (
                <TouchableOpacity
                  style={styles.resolveButton}
                  onPress={() => handleTicketAction(ticket, 'resolve')}
                >
                  <IconSymbol name="checkmark.circle.fill" size={16} color="#fff" />
                  <Text style={styles.resolveButtonText}>حل المشكلة</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.replyButton}
                onPress={() => handleTicketAction(ticket, 'reply')}
              >
                <IconSymbol name="message.fill" size={16} color="#6b7280" />
                <Text style={styles.replyButtonText}>رد</Text>
              </TouchableOpacity>

              {ticket.status !== 'closed' && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => handleTicketAction(ticket, 'close')}
                >
                  <IconSymbol name="xmark.circle.fill" size={16} color="#ef4444" />
                  <Text style={styles.closeButtonText}>إغلاق</Text>
                </TouchableOpacity>
              )}
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
  supportActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  supportActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  supportActionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  supportActionText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    textAlign: 'center',
  },
  ticketsContainer: {
    padding: 20,
  },
  ticketCard: {
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
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  ticketInfo: {
    flex: 1,
    paddingRight: 12,
  },
  ticketTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6,
    textAlign: 'right',
  },
  ticketStore: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'right',
  },
  ticketDate: {
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'right',
  },
  ticketBadges: {
    gap: 6,
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
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  ticketDescription: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'right',
  },
  ticketActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  progressButton: {
    backgroundColor: '#f59e0b',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  progressButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  resolveButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  resolveButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  replyButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  replyButtonText: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  closeButtonText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
  },
});
