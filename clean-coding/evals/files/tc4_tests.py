def calculate_shipping(weight_kg, destination, is_express=False):
    if weight_kg <= 0:
        raise ValueError("Weight must be positive")
    
    base_rates = {"domestic": 5.0, "europe": 12.0, "international": 25.0}
    
    if destination not in base_rates:
        raise ValueError(f"Unknown destination: {destination}")
    
    cost = base_rates[destination]
    
    if weight_kg > 20:
        cost += (weight_kg - 20) * 1.5
    
    if is_express:
        cost *= 2
    
    return round(cost, 2)
