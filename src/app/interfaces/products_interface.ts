export interface Producto {
    id_producto?: number;
    cod_producto?: string;
    categoria?: string;
    nombre_producto?: string;
    precio1?: string;
    precio2?: string;
    precio3?: string;
    itbs?: string;
    costo1?: string;
    costo2?: string;
    costo3?: string;
    unidad1?: string;
    unidad2?: string;
    unidad3?: string;
    cantidad1: number,
    cantidad2: number,
    cantidad3: number,
    precio_minimo1?: string;
    precio_minimo2?: string;
    precio_minimo3?: string;
}



export interface Product {
    current_page?: number;
    data: Producto[];
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    next_page_url?: any;
    path?: string;
    per_page?: number;
    prev_page_url?: any;
    to?: number;
    total?: number;
}





