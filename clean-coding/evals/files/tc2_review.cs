public class OrderProcessor
{
    public static double ProcessOrder(List<Item> items, Customer c, 
        bool applyDiscount, bool sendEmail, bool logToDb, string fmt)
    {
        double t = 0;
        for (int i = 0; i < items.Count; i++)
        {
            if (items[i].Price > 0)
                t += items[i].Price * items[i].Qty;
        }
        
        if (applyDiscount == true)
            t = t - (t * 0.15);
        
        if (t > 1000)
            t = t - 50; // loyalty bonus
        
        if (sendEmail)
        {
            // SmtpClient smtp = new SmtpClient();
            // smtp.Send(c.Email, "Order processed", "Total: " + t);
            EmailService.Send(c.Email, "Order processed", "Total: " + t);
        }
        
        if (logToDb)
            Database.Log("Order", c.Id, t, DateTime.Now);
        
        if (fmt == "USD")
            return Math.Round(t, 2);
        else if (fmt == "EUR")
            return Math.Round(t * 0.92, 2);
        else
            return t;
    }
}
