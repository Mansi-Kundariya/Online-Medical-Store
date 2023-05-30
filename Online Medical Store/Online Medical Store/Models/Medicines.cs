namespace Online_Medical_Store.Models
{
    public class Medicines
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Manufacturer { get; set; }
        public Decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string imageUrl { get; set; }

    }
}
