import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Familia = {
  id: string;
  codigo: string;
  nombre: string;
  cupos: number;
  asistentes_confirmados: number;
  estado: "pending" | "confirmed" | "rejected";
  link_invitacion?: string;
  link_activo?: boolean;
  confirmado_en?: string;
};

export type AvailableSlot = {
  id: string;
  family_name: string;
  family_code: string;
  total_slots: number;
  confirmed_slots: number;
  available_slots: number;
  created_at: string;
};

export type ConfirmationHistory = {
  id: string;
  family_name: string;
  family_code: string;
  total_slots: number;
  confirmed_slots: number;
  status: string;
  confirmed_at: string;
};

// Buscar familia por código
export async function buscarFamiliaPorCodigo(
  code: string
): Promise<Familia | null> {
  try {
    const { data, error } = await supabase
      .from("families")
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    if (error) {
      console.error("Error buscando familia:", error);
      return null;
    }

    // Verificar si el link está activo
    if (!data.is_link_active) {
      console.log("Link inactivo para:", code);
    }

    return {
      id: data.id,
      codigo: data.code,
      nombre: data.name,
      cupos: data.total_slots,
      asistentes_confirmados: data.confirmed_attendees,
      estado: data.status,
      link_invitacion: data.invitation_link,
      link_activo: data.is_link_active,
      confirmado_en: data.confirmed_at,
    };
  } catch (error) {
    console.error("Error en buscarFamiliaPorCodigo:", error);
    return null;
  }
}

// Confirmar asistencia
export async function confirmarAsistencia(
  code: string,
  attendeeCount: number
): Promise<{ success: boolean; message?: string }> {
  try {
    // Primero verificar que el link esté activo
    const familia = await buscarFamiliaPorCodigo(code);

    if (!familia) {
      return { success: false, message: "Familia no encontrada" };
    }

    if (!familia.link_activo) {
      return { success: false, message: "Este enlace ya fue utilizado" };
    }

    if (familia.estado === "confirmed") {
      return { success: false, message: "Ya confirmaste tu asistencia" };
    }

    const { data, error } = await supabase
      .from("families")
      .update({
        status: "confirmed",
        confirmed_attendees: attendeeCount,
        updated_at: new Date().toISOString(),
      })
      .eq("code", code.toUpperCase())
      .select()
      .single();

    if (error) {
      console.error("Error confirmando asistencia:", error);
      return { success: false, message: "Error al confirmar" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error en confirmarAsistencia:", error);
    return { success: false, message: "Error inesperado" };
  }
}

// Rechazar invitación
export async function rechazarInvitacion(
  code: string
): Promise<{ success: boolean; message?: string }> {
  try {
    // Primero verificar que el link esté activo
    const familia = await buscarFamiliaPorCodigo(code);

    if (!familia) {
      return { success: false, message: "Familia no encontrada" };
    }

    if (!familia.link_activo) {
      return { success: false, message: "Este enlace ya fue utilizado" };
    }

    const { data, error } = await supabase
      .from("families")
      .update({
        status: "rejected",
        confirmed_attendees: 0,
        updated_at: new Date().toISOString(),
      })
      .eq("code", code.toUpperCase())
      .select()
      .single();

    if (error) {
      console.error("Error rechazando invitación:", error);
      return { success: false, message: "Error al rechazar" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error en rechazarInvitacion:", error);
    return { success: false, message: "Error inesperado" };
  }
}

// Obtener cupos disponibles
export async function obtenerCuposDisponibles(): Promise<AvailableSlot[]> {
  try {
    const { data, error } = await supabase
      .from("available_slots")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error obteniendo cupos disponibles:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error en obtenerCuposDisponibles:", error);
    return [];
  }
}

// Obtener historial de confirmaciones
export async function obtenerHistorialConfirmaciones(): Promise<
  ConfirmationHistory[]
> {
  try {
    const { data, error } = await supabase
      .from("confirmations_history")
      .select("*")
      .order("confirmed_at", { ascending: false });

    if (error) {
      console.error("Error obteniendo historial:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error en obtenerHistorialConfirmaciones:", error);
    return [];
  }
}

// Obtener estadísticas generales
export async function obtenerEstadisticas() {
  try {
    const { data: families, error } = await supabase
      .from("families")
      .select("status, total_slots, confirmed_attendees");

    if (error) {
      console.error("Error obteniendo estadísticas:", error);
      return null;
    }

    const stats = {
      total_families: families.length,
      total_slots: families.reduce((sum, f) => sum + f.total_slots, 0),
      confirmed_families: families.filter((f) => f.status === "confirmed")
        .length,
      confirmed_attendees: families.reduce(
        (sum, f) => sum + (f.confirmed_attendees || 0),
        0
      ),
      rejected_families: families.filter((f) => f.status === "rejected").length,
      pending_families: families.filter((f) => f.status === "pending").length,
    };

    return stats;
  } catch (error) {
    console.error("Error en obtenerEstadisticas:", error);
    return null;
  }
}
