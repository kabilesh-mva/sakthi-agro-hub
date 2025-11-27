// Type declarations for ogl
declare module "ogl" {
  export class Renderer {
    constructor(options?: {
      canvas?: HTMLCanvasElement;
      width?: number;
      height?: number;
      dpr?: number;
      alpha?: boolean;
      depth?: boolean;
      stencil?: boolean;
      antialias?: boolean;
      premultipliedAlpha?: boolean;
      preserveDrawingBuffer?: boolean;
      powerPreference?: string;
    });
    gl: WebGLRenderingContext & {
      canvas: HTMLCanvasElement;
    };
    setSize(width: number, height: number): void;
    render(params: { scene: Transform }): void;
  }

  export class Transform {
    constructor();
    addChild(child: unknown): void;
    setParent(parent: unknown): void;
  }

  export class Vec3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): void;
    copy(v: Vec3): Vec3;
    add(v: Vec3 | number): Vec3;
    multiply(v: Vec3 | number): Vec3;
    sub(v: Vec3): Vec3;
    lerp(v: Vec3, alpha: number): void;
  }

  export class Color {
    constructor(color?: string | number[]);
    r: number;
    g: number;
    b: number;
  }

  export class Polyline {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        points: Vec3[];
        vertex?: string;
        fragment?: string;
        uniforms?: Record<string, { value: unknown }>;
      }
    );
    mesh: {
      setParent(parent: Transform): void;
      program: {
        uniforms: Record<string, { value: unknown }>;
      };
    };
    updateGeometry(): void;
    resize(): void;
  }
}

// Define the type for the line object
declare global {
  interface LineObject {
    spring: number;
    friction: number;
    mouseVelocity: Vec3;
    mouseOffset: Vec3;
    points?: Vec3[];
    polyline?: {
      updateGeometry(): void;
      resize(): void;
      mesh: {
        setParent(parent: unknown): void;
        program: {
          uniforms: Record<string, { value: unknown }>;
        };
      };
    };
  }
}
