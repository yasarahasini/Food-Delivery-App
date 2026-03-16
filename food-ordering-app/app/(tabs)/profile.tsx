import { View, Text, Image, Pressable, ScrollView, Platform, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();


  const user = {
    name: "Yasara",
    location: "Colombo, Sri Lanka",
    email: "yasara@example.com",
    avatar: require("../../assets/images/yasara.png"),
    orders: 12,
    favorites: 5,
    points: 450
  };

  const MenuOption = ({ icon, title, subtitle, onPress, color = "#555" }: any) => (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [styles.menuItem, { opacity: pressed ? 0.7 : 1 }]}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={18} color="#ccc" />
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fbfbfe" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
     
        <View style={styles.header}>
          <Pressable 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          
          <View style={styles.profileInfo}>
            <Image source={user.avatar} style={styles.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>

       
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user.orders}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={[styles.statCard, styles.statBorder]}>
            <Text style={styles.statNumber}>{user.favorites}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user.points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

      
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <MenuOption icon="person-outline" title="Edit Profile" subtitle="Change your details" color="#ff7a00" />
          <MenuOption icon="location-outline" title="Shipping Address" subtitle="Home, Work..." color="#4CAF50" />
          <MenuOption icon="card-outline" title="Payment Methods" subtitle="Visa **4242" color="#2196F3" />
          
          <Text style={[styles.sectionTitle, { marginTop: 25 }]}>General</Text>
          <MenuOption icon="notifications-outline" title="Notifications" color="#673AB7" />
          <MenuOption icon="help-circle-outline" title="Help Center" color="#00BCD4" />
          
          <Pressable style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ff7a00",
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'ios' ? 60 : 40,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)",
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 16,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  menuSection: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    padding: 15,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});