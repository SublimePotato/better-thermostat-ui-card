import { HassEntityAttributeBase, HassEntityBase } from "home-assistant-js-websocket";
import { ZeroToHundredAsString } from "./zeroToHundredAsString";

export type HvacMode = "off" | "heat" | "cool" | "heat_cool" | "auto" | "dry" | "fan_only";

export const CLIMATE_PRESET_NONE = "none";

export type HvacAction = "off" | "heating" | "cooling" | "drying" | "idle";

export interface BatteryState {
  battery: "on" | "off" | ZeroToHundredAsString; // this either contains the battery percentage or the binary_sensor "battery_low" with the state "on" or "off" 
  battery_id: string;
}

export type ClimateEntity = HassEntityBase & {
    attributes: HassEntityAttributeBase & {
        hvac_mode: HvacMode;
        hvac_modes: HvacMode[];
        hvac_action?: HvacAction;
        current_temperature: number;
        min_temp: number;
        max_temp: number;
        temperature: number;
        target_temp_step?: number;
        target_temp_high?: number;
        target_temp_low?: number;
        humidity?: number;
        current_humidity?: number;
        target_humidity_low?: number;
        target_humidity_high?: number;
        min_humidity?: number;
        max_humidity?: number;
        fan_mode?: string;
        fan_modes?: string[];
        preset_mode?: string;
        preset_modes?: string[];
        swing_mode?: string;
        swing_modes?: string[];
        aux_heat?: "on" | "off";
        window_open?: boolean;
        call_for_heat?: boolean;
        saved_temperature?: never; // the value is never used, there are just checks for its existence
        errors: string; // JSON containing string[];
        batteries: string; // JSON containing Record<string, BatteryState>;
    };
};

export const enum ClimateEntityFeature {
    TARGET_TEMPERATURE = 1,
    TARGET_TEMPERATURE_RANGE = 2,
    TARGET_HUMIDITY = 4,
    FAN_MODE = 8,
    PRESET_MODE = 16,
    SWING_MODE = 32,
    AUX_HEAT = 64,
  }

  export const CLIMATE_HVAC_ACTION_TO_MODE: any = {
    cooling: "cool",
    drying: "dry",
    fan: "fan_only",
    preheating: "heat",
    heating: "heat",
    idle: "off",
    off: "off",
  };

export const CLIMATE_SUPPORT_TARGET_TEMPERATURE = 1;
export const CLIMATE_SUPPORT_TARGET_TEMPERATURE_RANGE = 2;
export const CLIMATE_SUPPORT_TARGET_HUMIDITY = 4;
export const CLIMATE_SUPPORT_FAN_MODE = 8;
export const CLIMATE_SUPPORT_PRESET_MODE = 16;
export const CLIMATE_SUPPORT_SWING_MODE = 32;
export const CLIMATE_SUPPORT_AUX_HEAT = 64;

const hvacModeOrdering: { [key in HvacMode]: number } = {
    auto: 1,
    heat_cool: 2,
    heat: 3,
    cool: 4,
    dry: 5,
    fan_only: 6,
    off: 7,
};

export const compareClimateHvacModes = (mode1: HvacMode, mode2: HvacMode) =>
    hvacModeOrdering[mode1] - hvacModeOrdering[mode2];
