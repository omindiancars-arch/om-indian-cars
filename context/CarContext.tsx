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
          setCars(carsData.map(c => ({
            ...c,
            showOnHome: c.show_on_home
          })));
        } else {
          setCars(INITIAL_CARS);
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
        console.warn("Supabase load failed. Using initial data.", error);
        setCars(INITIAL_CARS);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  const addCar = async (carData: Omit<Car, "id">) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .insert([{
          name: carData.name,
          price: carData.price,
          image: carData.image,
          images: carData.images,
          videos: carData.videos,
          description: carData.description,
          show_on_home: carData.showOnHome,
          specs: carData.specs,
          features: carData.features,
          condition: carData.condition,
          services: carData.services
        }])
        .select()
        .single();

      if (error) throw error;
      setCars(prev => [data, ...prev]);
    } catch (error) {
      console.error("Failed to add car:", error instanceof Error ? error.message : JSON.stringify(error, null, 2) || error);
      const newCar = { ...carData, id: Math.random().toString(36).substr(2, 9) };
      setCars(prev => [newCar, ...prev]);
    }
  };

  const isUUID = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  const updateCar = async (id: string, carData: Partial<Car>) => {
    try {
      if (isUUID(id)) {
        const updatePayload: any = { ...carData };
        if (carData.showOnHome !== undefined) {
          updatePayload.show_on_home = carData.showOnHome;
          delete updatePayload.showOnHome;
        }

        const { error } = await supabase.from('cars').update(updatePayload).eq('id', id);
        if (error) throw error;
      }
      setCars(prev => prev.map(car => car.id === id ? { ...car, ...carData } : car));
    } catch (error) {
      console.error("Failed to update car:", error);
      setCars(prev => prev.map(car => car.id === id ? { ...car, ...carData } : car));
    }
  };

  const deleteCar = async (id: string) => {
    try {
      if (isUUID(id)) {
        const { error } = await supabase.from('cars').delete().eq('id', id);
        if (error) throw error;
      }
      setCars(prev => prev.filter(car => car.id !== id));
    } catch (error) {
      console.error("Failed to delete car:", error);
      setCars(prev => prev.filter(car => car.id !== id));
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
