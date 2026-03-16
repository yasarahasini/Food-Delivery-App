import { View, Text, ScrollView, Image, Pressable, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { foods } from "../types/Food"; 

export default function OrderHistoryScreen() {
  const router = useRouter();

  
  const history = [
    { id: 1, item: foods[0], date: "12 Oct, 2023", status: "Completed", count: 2 },
    { id: 2, item: foods[1], date: "08 Oct, 2023", status: "Cancelled", count: 1 },
    { id: 3, item: foods[2], date: "01 Oct, 2023", status: "Completed", count: 3 },
  ];

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {history.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.cardHeader}>
              <View style={styles.dateRow}>
                <Ionicons name="calendar-outline" size={14} color="#888" />
                <Text style={styles.dateText}>{order.date}</Text>
              </View>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: order.status === "Completed" ? "#e6f9ee" : "#ffeeee" }
              ]}>
                <Text style={[
                  styles.statusText, 
                  { color: order.status === "Completed" ? "#27ae60" : "#eb5757" }
                ]}>
                  {order.status}
                </Text>
              </View>
            </View>

            <View style={styles.itemRow}>
              <Image source={order.item.image} style={styles.itemImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{order.item.name}</Text>
                <Text style={styles.itemDetails}>{order.count} Items • ${order.item.price.toFixed(2)}</Text>
              </View>
              <Text style={styles.totalPrice}>
                ${(order.item.price * order.count).toFixed(2)}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardFooter}>
              <Pressable style={styles.detailsBtn}>
                <Text style={styles.detailsBtnText}>View Details</Text>
              </Pressable>
              <Pressable style={styles.reorderBtn}>
                <Ionicons name="refresh" size={16} color="#fff" />
                <Text style={styles.reorderBtnText}>Reorder</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fbfbfe" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  backBtn: { backgroundColor: "#f5f5f5", padding: 8, borderRadius: 12 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
      android: { elevation: 2 }
    })
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  dateRow: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontSize: 13, color: '#888', marginLeft: 5 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  itemImage: { width: 60, height: 60, borderRadius: 12, marginRight: 15 },
  itemName: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  itemDetails: { fontSize: 13, color: '#888', marginTop: 2 },
  totalPrice: { fontSize: 17, fontWeight: '800', color: '#1a1a1a' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  detailsBtn: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  detailsBtnText: { color: '#666', fontWeight: '600' },
  reorderBtn: { 
    flex: 1, 
    backgroundColor: '#ff7a00', 
    flexDirection: 'row', 
    paddingVertical: 10, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 10
  },
  reorderBtnText: { color: '#fff', fontWeight: 'bold', marginLeft: 5 }
});