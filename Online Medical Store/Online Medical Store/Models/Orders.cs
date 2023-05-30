namespace Online_Medical_Store.Models
{
    public class Orders
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public string MedicineName { get; set; }
        public int MedicineID { get; set; }
        public decimal OrderTotal { get; set; }
    }
}
