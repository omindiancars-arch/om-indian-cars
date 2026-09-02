"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Car {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: string[];
  videos?: string[];
  description?: string;
  showOnHome?: boolean;
  specs: {
    make?: string;
    model?: string;
    variant?: string;
    year?: string;
    makeMonth?: string;
    owner?: string;
    color?: string;
    fuel: string;
    transmission: string;
    insuranceType?: string;
    registrationPlace?: string;
    numberPlate?: string;
    kmsDriven?: string;
    engineCapacity?: string;
    location?: string;
    postingDate?: string;
  };
  features?: {
    powerSteering?: boolean;
    cruiseControl?: boolean;
    navigationSystem?: boolean;
    adjustableSteering?: boolean;
    airConditioning?: string;
    powerWindows?: string;
    sunroof?: boolean;
    alloyWheels?: boolean;
    adjustableMirror?: string;
    bluetooth?: boolean;
    amFmRadio?: boolean;
    usbCompatibility?: boolean;
    auxCompatibility?: boolean;
    abs?: boolean;
    antiTheftDevice?: boolean;
    rearParkingCamera?: boolean;
    parkingSensors?: boolean;
    lockSystem?: string;
    numberOfAirbags?: string;
  };
  condition?: {
    battery?: string;
    tyre?: string;
    serviceHistory?: string;
    vehicleCertified?: string;
    accidental?: string;
  };
  services?: {
    finance?: boolean;
    exchange?: boolean;
  };
}

export interface Inquiry {
  id: string;
  carId: string;
  carName: string;
  customerName: string;
  customerPhone: string;
  timestamp: string;
}

interface CarContextType {
  cars: Car[];
  inquiries: Inquiry[];
  addCar: (car: Omit<Car, "id">) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  addInquiry: (carId: string, carName: string, customerName: string, customerPhone: string) => void;
  clearInquiries: () => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

const INITIAL_CARS: Car[] = [];

export function CarProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First check Supabase
        const { data: carsData, error: carsError } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false });

        if (carsError) throw carsError;

        if (carsData && carsData.length > 0) {
          const mappedCars: Car[] = carsData.map(c => ({
            id: c.id,
            name: c.name,
            price: c.price,
            image: c.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
            images: c.images || [],
            videos: c.videos || [],
            description: c.description || "",
            showOnHome: c.show_on_home !== false,
            specs: c.specs || {},
            features: c.features || {},
            condition: c.condition || {},
            services: c.services || {}
          }));
          setCars(mappedCars);
          try {
            localStorage.setItem('om_cached_cars', JSON.stringify(mappedCars));
          } catch (e) {}
        } else {
          // Check local storage cache if available
          try {
            const cached = localStorage.getItem('om_cached_cars');
            if (cached) {
              setCars(JSON.parse(cached));
            } else {
              setCars(INITIAL_CARS);
            }
          } catch (e) {
            setCars(INITIAL_CARS);
          }
        }

        const { data: inquiriesData, error: inquiriesError } = await supabase
          .from('inquiries')
          .select('*')
          .order('timestamp', { ascending: false });

        if (inquiriesError) throw inquiriesError;
        if (inquiriesData) {
          setInquiries(inquiriesData.map(i => ({
            id: i.id,
            carId: i.car_id,
            carName: i.car_name,
            customerName: i.customer_name,
            customerPhone: i.customer_phone,
            timestamp: i.timestamp
          })));
        }
      } catch (error) {
        console.warn("Supabase load failed. Using local cache/initial data.", error);
        try {
          const cached = localStorage.getItem('om_cached_cars');
          if (cached) {
            setCars(JSON.parse(cached));
          } else {
            setCars(INITIAL_CARS);
          }
        } catch (e) {
          setCars(INITIAL_CARS);
        }
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  const addCar = async (carData: Omit<Car, "id">) => {
    try {
      const insertPayload = {
        name: carData.name,
        price: carData.price,
        image: carData.image,
        images: carData.images || [],
        videos: carData.videos || [],
        description: carData.description || "",
        show_on_home: carData.showOnHome ?? true,
        specs: carData.specs || {},
        features: carData.features || {},
        condition: carData.condition || {},
        services: carData.services || {}
      };

      const { data, error } = await supabase
        .from('cars')
        .insert([insertPayload])
        .select()
        .single();

      if (error) throw error;

      const formattedCar: Car = {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        images: data.images || [],
        videos: data.videos || [],
        description: data.description || "",
        showOnHome: data.show_on_home !== false,
        specs: data.specs || {},
        features: data.features || {},
        condition: data.condition || {},
        services: data.services || {}
      };

      setCars(prev => {
        const updated = [formattedCar, ...prev.filter(c => c.id !== formattedCar.id)];
        try {
          localStorage.setItem('om_cached_cars', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      return formattedCar;
    } catch (error) {
      console.error("Failed to add car to Supabase:", error instanceof Error ? error.message : JSON.stringify(error, null, 2) || error);
      const newCar: Car = { 
        ...carData, 
        id: Math.random().toString(36).substring(2, 11),
        showOnHome: carData.showOnHome ?? true,
        images: carData.images || [],
        videos: carData.videos || [],
        description: carData.description || "",
        specs: carData.specs || {},
        features: carData.features || {},
        condition: carData.condition || {},
        services: carData.services || {}
      };
      setCars(prev => {
        const updated = [newCar, ...prev];
        try {
          localStorage.setItem('om_cached_cars', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      return newCar;
    }
  };

  const isUUID = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  const updateCar = async (id: string, carData: Partial<Car>) => {
    try {
      if (isUUID(id)) {
        const updatePayload: any = {};
        if (carData.name !== undefined) updatePayload.name = carData.name;
        if (carData.price !== undefined) updatePayload.price = carData.price;
        if (carData.image !== undefined) updatePayload.image = carData.image;
        if (carData.images !== undefined) updatePayload.images = carData.images;
        if (carData.videos !== undefined) updatePayload.videos = carData.videos;
        if (carData.description !== undefined) updatePayload.description = carData.description;
        if (carData.showOnHome !== undefined) updatePayload.show_on_home = carData.showOnHome;
        if (carData.specs !== undefined) updatePayload.specs = carData.specs;
        if (carData.features !== undefined) updatePayload.features = carData.features;
        if (carData.condition !== undefined) updatePayload.condition = carData.condition;
        if (carData.services !== undefined) updatePayload.services = carData.services;

        const { error } = await supabase.from('cars').update(updatePayload).eq('id', id);
        if (error) throw error;
      }
      setCars(prev => {
        const updated = prev.map(car => car.id === id ? { ...car, ...carData } : car);
        try {
          localStorage.setItem('om_cached_cars', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    } catch (error) {
      console.error("Failed to update car:", error);
      setCars(prev => {
        const updated = prev.map(car => car.id === id ? { ...car, ...carData } : car);
        try {
          localStorage.setItem('om_cached_cars', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  };

  const deleteCar = async (id: string) => {
    try {
      if (isUUID(id)) {
        const { error } = await supabase.from('cars').delete().eq('id', id);
        if (error) throw error;
      }
      setCars(prev => {
        const updated = prev.filter(car => car.id !== id);
        try {
          localStorage.setItem('om_cached_cars', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    } catch (error) {
      console.error("Failed to delete car:", error);
      setCars(prev => {
        const updated = prev.filter(car => car.id !== id);
        try {
          localStorage.setItem('om_cached_cars', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  };

  const addInquiry = async (carId: string, carName: string, customerName: string, customerPhone: string) => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          car_id: isUUID(carId) ? carId : null,
          car_name: carName,
          customer_name: customerName,
          customer_phone: customerPhone
        }])
        .select()
        .single();

      if (error) throw error;
      setInquiries(prev => [data, ...prev]);
    } catch (error) {
      console.error("Failed to add inquiry:", error);
      const newInquiry: Inquiry = {
        id: Math.random().toString(36).substr(2, 9),
        carId,
        carName,
        customerName,
        customerPhone,
        timestamp: new Date().toISOString(),
      };
      setInquiries((prev) => [newInquiry, ...prev]);
    }
  };

  const clearInquiries = async () => {
    try {
      await supabase.from('inquiries').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      setInquiries([]);
    } catch (error) {
      console.error("Failed to clear inquiries:", error);
      setInquiries([]);
    }
  };

  return (
    <CarContext.Provider value={{ cars, inquiries, addCar, updateCar, deleteCar, addInquiry, clearInquiries }}>
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error("useCars must be used within a CarProvider");
  }
  return context;
}
