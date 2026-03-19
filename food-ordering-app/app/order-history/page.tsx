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
        <Pressable onPress={() => router.back()} style={styles.backPill}>
          <Ionicons name="arrow-back" size={20} color="#1A1A1A" />
        </Pressable>
        <Text style={styles.headerTitle}>Past Feasts</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollPadding}
      >
        {history.map((order, index) => (
          <View key={order.id} style={styles.ticketWrapper}>
            
          
            <View style={styles.timelineSide}>
              <View style={[
                styles.statusDot, 
                { backgroundColor: order.status === "Completed" ? "#27ae60" : "#eb5757" }
              ]} />
              {index !== history.length - 1 && <View style={styles.timelineLine} />}
            </View>

          
            <View style={styles.orderCard}>
              <View style={styles.cardTop}>
                <View style={styles.imageContainer}>
                  <Image source={order.item.image} style={styles.itemImage} />
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{order.count}</Text>
                  </View>
                </View>

                <View style={styles.mainInfo}>
                  <Text style={styles.dateText}>{order.date.toUpperCase()}</Text>
                  <Text style={styles.itemName} numberOfLines={1}>{order.item.name}</Text>
                  <Text style={styles.statusLabel(order.status)}>{order.status}</Text>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceSymbol}>$</Text>
                  <Text style={styles.priceValue}>
                    {(order.item.price * order.count).toFixed(0)}
                  </Text>
                </View>
              </View>

              <View style={styles.perforationRow}>
                <View style={styles.leftCutout} />
                <View style={styles.dashLine} />
                <View style={styles.rightCutout} />
              </View>

              <View style={styles.cardBottom}>
                <Pressable style={styles.textBtn}>
                  <Text style={styles.textBtnLabel}>Details</Text>
                </Pressable>
                
                <Pressable style={styles.reorderAction}>
                  <Text style={styles.reorderActionText}>Repeat Order</Text>
                  <Ionicons name="repeat" size={16} color="#FF7A00" />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7F6" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backPill: { 
    backgroundColor: "#fff", 
    padding: 10, 
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2 
  },
  headerTitle: { fontSize: 22, fontWeight: "900", letterSpacing: -0.5, color: "#1A1A1A" },
  
  scrollPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  
  ticketWrapper: { flexDirection: 'row', marginBottom: 10 },
  

  timelineSide: { width: 30, alignItems: 'center' },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginTop: 20, zIndex: 2 },
  timelineLine: { width: 2, flex: 1, backgroundColor: '#E0E0E0', marginTop: -5 },


  orderCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 4,
    overflow: 'hidden'
  },
  cardTop: { flexDirection: 'row', padding: 18, alignItems: 'center' },
  imageContainer: { position: 'relative' },
  itemImage: { width: 70, height: 70, borderRadius: 20, backgroundColor: '#f9f9f9' },
  countBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF7A00',
    borderRadius: 10,
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: '#fff'
  },
  countText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  
  mainInfo: { flex: 1, marginLeft: 15 },
  dateText: { fontSize: 10, color: '#BBB', fontWeight: '800', letterSpacing: 1 },
  itemName: { fontSize: 17, fontWeight: '800', color: '#1A1A1A', marginVertical: 2 },
  statusLabel: (status) => ({
    fontSize: 11,
    fontWeight: '700',
    color: status === "Completed" ? "#27ae60" : "#eb5757"
  }),

  priceContainer: { flexDirection: 'row', alignItems: 'flex-start' },
  priceSymbol: { fontSize: 12, fontWeight: '800', color: '#1A1A1A', marginTop: 4 },
  priceValue: { fontSize: 24, fontWeight: '900', color: '#1A1A1A' },


  perforationRow: { flexDirection: 'row', alignItems: 'center', height: 20 },
  leftCutout: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#F4F7F6', marginLeft: -10 },
  rightCutout: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#F4F7F6', marginRight: -10 },
  dashLine: { flex: 1, height: 1, borderStyle: 'dashed', borderWidth: 1, borderColor: '#F0F0F0', marginHorizontal: 5 },

  cardBottom: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 5
  },
  textBtn: { paddingVertical: 8 },
  textBtnLabel: { color: '#AAA', fontWeight: '700', fontSize: 13 },
  
  reorderAction: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF5EE', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 12 
  },
  reorderActionText: { color: '#FF7A00', fontWeight: '800', fontSize: 13, marginRight: 8 }
});