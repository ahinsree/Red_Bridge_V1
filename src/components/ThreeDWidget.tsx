"use client";

import React, { useRef, useEffect } from "react";
import { useThreeDCard } from "./ThreeDCard";

type WidgetType = "strategy" | "cx" | "ex" | "data" | "intelligence" | "transformation";

interface ThreeDWidgetProps {
  type: WidgetType;
}

// 3D Point Interface
interface Point3D {
  x: number;
  y: number;
  z: number;
  color?: string;
  size?: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  scale: number;
  zVal: number;
}

// Rotation helpers
const rotateX = (x: number, y: number, z: number, angle: number): [number, number, number] => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
};

const rotateY = (x: number, y: number, z: number, angle: number): [number, number, number] => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos - z * sin, y, x * sin + z * cos];
};

// 3D Perspective Projection
const focus = 180; // Focal length
const project = (x: number, y: number, z: number, w: number, h: number) => {
  const zOffset = z + 130; // Push geometry in front of camera
  const scale = focus / Math.max(1, zOffset);
  return {
    x: x * scale + w / 2,
    y: y * scale + h / 2,
    scale,
    zVal: z,
  };
};

export default function ThreeDWidget({ type }: ThreeDWidgetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mouseX, mouseY, isHovered } = useThreeDCard();
  
  // Keep mouse coords in ref to avoid re-triggering useEffect
  const mouseCoords = useRef({ x: 0, y: 0 });
  const hoverState = useRef(false);

  useEffect(() => {
    mouseCoords.current = { x: mouseX, y: mouseY };
    hoverState.current = isHovered;
  }, [mouseX, mouseY, isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // --- GEOMETRY INITIALIZATION FOR DIFFERENT TYPES ---
    
    // Type 1: Strategy (Nested spheres)
    const strategyPointsOuter: Point3D[] = [];
    const strategyPointsInner: Point3D[] = [];
    const numLat = 6;
    const numLon = 10;
    
    // Outer Sphere (radius 48)
    for (let i = 1; i < numLat; i++) {
      const theta = (i * Math.PI) / numLat;
      for (let j = 0; j < numLon; j++) {
        const phi = (j * 2 * Math.PI) / numLon;
        const x = 48 * Math.sin(theta) * Math.cos(phi);
        const y = 48 * Math.cos(theta);
        const z = 48 * Math.sin(theta) * Math.sin(phi);
        strategyPointsOuter.push({ x, y, z });
      }
    }
    // Inner Sphere (radius 22)
    for (let i = 1; i < 4; i++) {
      const theta = (i * Math.PI) / 4;
      for (let j = 0; j < 6; j++) {
        const phi = (j * 2 * Math.PI) / 6;
        const x = 22 * Math.sin(theta) * Math.cos(phi);
        const y = 22 * Math.cos(theta);
        const z = 22 * Math.sin(theta) * Math.sin(phi);
        strategyPointsInner.push({ x, y, z });
      }
    }

    // Type 3: Employee Experience Node Network (12 nodes)
    const exNodes: (Point3D & { vx: number; vy: number; vz: number })[] = Array.from({ length: 12 }, () => ({
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 80,
      z: (Math.random() - 0.5) * 80,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      vz: (Math.random() - 0.5) * 0.8,
    }));

    // Type 5: Experience Intelligence Neural Network (15 nodes)
    const intelNodes: Point3D[] = Array.from({ length: 15 }, () => {
      // Position on an ellipsoid
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const rx = 40 + Math.random() * 8;
      const ry = 30 + Math.random() * 8;
      const rz = 30 + Math.random() * 8;
      return {
        x: rx * Math.sin(phi) * Math.cos(theta),
        y: ry * Math.sin(phi) * Math.sin(theta),
        z: rz * Math.cos(phi),
      };
    });
    // Active electrical signals traveling along network edges
    interface Signal {
      fromIndex: number;
      toIndex: number;
      progress: number; // 0 to 1
      speed: number;
    }
    const signals: Signal[] = Array.from({ length: 4 }, () => ({
      fromIndex: Math.floor(Math.random() * 15),
      toIndex: Math.floor(Math.random() * 15),
      progress: Math.random(),
      speed: 0.015 + Math.random() * 0.01,
    }));

    // --- ANIMATION LOOP ---
    const tick = () => {
      time += 0.01;
      
      // Interpolate parallax offsets smoothly (target depends on mouse position)
      const targetPX = mouseCoords.current.x * 0.4;
      const targetPY = mouseCoords.current.y * 0.4;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Color scheme variables from theme
      const colorRed = "194, 25, 42"; // #C2192A
      const colorCream = "250, 250, 248"; // #FAFAF8

      if (type === "strategy") {
        // --- 1. STRATEGIC ADVISORY (Nested rotating wireframe spheres) ---
        const rotXAngle = time * 0.3 + targetPY;
        const rotYAngle = time * 0.4 + targetPX;

        // Draw inner sphere (rotates opposite)
        const innerRotX = -time * 0.5 - targetPY * 0.5;
        const innerRotY = -time * 0.4 - targetPX * 0.5;

        // Project inner points
        const projectedInner = strategyPointsInner.map((p) => {
          let [rx, ry, rz] = rotateX(p.x, p.y, p.z, innerRotX);
          [rx, ry, rz] = rotateY(rx, ry, rz, innerRotY);
          return project(rx, ry, rz, width, height);
        });

        // Draw inner sphere wireframe
        ctx.strokeStyle = `rgba(${colorRed}, 0.25)`;
        ctx.lineWidth = 1;
        for (let i = 0; i < projectedInner.length; i++) {
          const p1 = projectedInner[i];
          const ringIndex = Math.floor(i / 6);
          const nextIndex = ringIndex * 6 + ((i + 1) % 6);
          const p2 = projectedInner[nextIndex];
          
          if (p1.zVal < 20 && p2.zVal < 20) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Project outer points
        const projectedOuter = strategyPointsOuter.map((p) => {
          let [rx, ry, rz] = rotateX(p.x, p.y, p.z, rotXAngle);
          [rx, ry, rz] = rotateY(rx, ry, rz, rotYAngle);
          return project(rx, ry, rz, width, height);
        });

        // Draw outer sphere latitudinal lines
        ctx.strokeStyle = `rgba(${colorCream}, 0.08)`;
        ctx.lineWidth = 1;
        for (let lat = 0; lat < numLat - 1; lat++) {
          ctx.beginPath();
          for (let lon = 0; lon <= numLon; lon++) {
            const idx = lat * numLon + (lon % numLon);
            const pt = projectedOuter[idx];
            if (lon === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
        }

        // Draw outer sphere longitudinal lines
        ctx.strokeStyle = `rgba(${colorCream}, 0.08)`;
        for (let lon = 0; lon < numLon; lon++) {
          ctx.beginPath();
          for (let lat = 0; lat < numLat - 1; lat++) {
            const idx = lat * numLon + lon;
            const pt = projectedOuter[idx];
            if (lat === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
        }

        // Draw outer sphere nodes
        projectedOuter.forEach((p) => {
          const depthAlpha = Math.max(0.1, (p.zVal + 48) / 96);
          ctx.fillStyle = `rgba(${colorCream}, ${depthAlpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 1.5, 0, 2 * Math.PI);
          ctx.fill();
          
          if (hoverState.current && p.zVal > 0) {
            ctx.fillStyle = `rgba(${colorRed}, 0.6)`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.scale * 2.2, 0, 2 * Math.PI);
            ctx.fill();
          }
        });

      } else if (type === "cx") {
        // --- 2. CUSTOMER EXPERIENCE (Double-helix flow) ---
        const rotY = time * 0.6 + targetPX;
        const rotX = Math.sin(time * 0.4) * 0.2 + targetPY;
        
        const helixPoints: { proj: ProjectedPoint; isRed: boolean }[] = [];
        const numHelixPoints = 45;

        for (let i = 0; i < numHelixPoints; i++) {
          const t = (i / numHelixPoints) * Math.PI * 4 + time * 1.2;
          
          const majorRadius = 40;
          const minorRadius = 10;
          
          // Coordinate on a helix twisted around an orbital ring
          const orbitAngle = (i / numHelixPoints) * Math.PI * 2;
          const xVal = majorRadius * Math.cos(orbitAngle) + minorRadius * Math.cos(t) * Math.cos(orbitAngle);
          const yVal = minorRadius * Math.sin(t);
          const zVal = majorRadius * Math.sin(orbitAngle) + minorRadius * Math.cos(t) * Math.sin(orbitAngle);

          // Helix 1 (Red)
          let [rx1, ry1, rz1] = rotateY(xVal, yVal, zVal, rotY);
          [rx1, ry1, rz1] = rotateX(rx1, ry1, rz1, rotX);
          helixPoints.push({
            proj: project(rx1, ry1, rz1, width, height),
            isRed: true,
          });

          // Helix 2 (White/Cream) - shifted phase by PI
          const xVal2 = majorRadius * Math.cos(orbitAngle) + minorRadius * Math.cos(t + Math.PI) * Math.cos(orbitAngle);
          const yVal2 = minorRadius * Math.sin(t + Math.PI);
          const zVal2 = majorRadius * Math.sin(orbitAngle) + minorRadius * Math.cos(t + Math.PI) * Math.sin(orbitAngle);
          
          let [rx2, ry2, rz2] = rotateY(xVal2, yVal2, zVal2, rotY);
          [rx2, ry2, rz2] = rotateX(rx2, ry2, rz2, rotX);
          helixPoints.push({
            proj: project(rx2, ry2, rz2, width, height),
            isRed: false,
          });
        }

        // Sort by depth (painters algorithm)
        helixPoints.sort((a, b) => b.proj.zVal - a.proj.zVal);

        // Draw double helix points
        helixPoints.forEach(({ proj, isRed }) => {
          const depthAlpha = Math.max(0.1, (proj.zVal + 50) / 100);
          const size = proj.scale * (isRed ? 2 : 1.5);
          
          ctx.fillStyle = isRed
            ? `rgba(${colorRed}, ${depthAlpha * 0.9})`
            : `rgba(${colorCream}, ${depthAlpha * 0.6})`;
          
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, size, 0, 2 * Math.PI);
          ctx.fill();

          if (hoverState.current && Math.random() > 0.8) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgb(${colorRed})`;
            ctx.fillStyle = `rgba(${colorRed}, 1)`;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, size * 1.5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        });

      } else if (type === "ex") {
        // --- 3. EMPLOYEE EXPERIENCE (Attractor node network) ---
        const rotY = time * 0.2 + targetPX * 0.4;
        const rotX = time * 0.15 + targetPY * 0.4;

        // Attractor coordinate in 3D (based on mouse position)
        const attractorX = mouseCoords.current.x * 50;
        const attractorY = mouseCoords.current.y * 50;
        const attractorZ = 0;

        // Update physics and apply attractor force if hovered
        exNodes.forEach((node) => {
          if (hoverState.current) {
            // Accelerate node towards attractor
            const dx = attractorX - node.x;
            const dy = attractorY - node.y;
            const dz = attractorZ - node.z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz) || 1;
            
            // Soft attraction pull
            node.vx += (dx / dist) * 0.08;
            node.vy += (dy / dist) * 0.08;
            node.vz += (dz / dist) * 0.08;
          }

          // Move
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;

          // Drag
          node.vx *= 0.95;
          node.vy *= 0.95;
          node.vz *= 0.95;

          // Add a tiny random jitter
          node.vx += (Math.random() - 0.5) * 0.15;
          node.vy += (Math.random() - 0.5) * 0.15;
          node.vz += (Math.random() - 0.5) * 0.15;

          // Bounce off boundary sphere (radius 55)
          const nodeDist = Math.sqrt(node.x*node.x + node.y*node.y + node.z*node.z);
          if (nodeDist > 55) {
            node.vx -= (node.x / nodeDist) * 0.5;
            node.vy -= (node.y / nodeDist) * 0.5;
            node.vz -= (node.z / nodeDist) * 0.5;
          }
        });

        // Project nodes
        const projectedNodes = exNodes.map((n) => {
          let [rx, ry, rz] = rotateY(n.x, n.y, n.z, rotY);
          [rx, ry, rz] = rotateX(rx, ry, rz, rotX);
          return {
            proj: project(rx, ry, rz, width, height),
            orig: n,
          };
        });

        // Draw connections
        ctx.lineWidth = 1;
        for (let i = 0; i < projectedNodes.length; i++) {
          for (let j = i + 1; j < projectedNodes.length; j++) {
            const n1 = projectedNodes[i];
            const n2 = projectedNodes[j];
            const dx = n1.orig.x - n2.orig.x;
            const dy = n1.orig.y - n2.orig.y;
            const dz = n1.orig.z - n2.orig.z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            if (dist < 45) {
              const alpha = (1 - dist / 45) * 0.15 * Math.max(0.1, (n1.proj.zVal + n2.proj.zVal + 100) / 200);
              ctx.strokeStyle = hoverState.current 
                ? `rgba(${colorRed}, ${alpha * 2})` 
                : `rgba(${colorCream}, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(n1.proj.x, n1.proj.y);
              ctx.lineTo(n2.proj.x, n2.proj.y);
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        projectedNodes.forEach(({ proj }) => {
          const depthAlpha = Math.max(0.1, (proj.zVal + 55) / 110);
          ctx.fillStyle = hoverState.current
            ? `rgba(${colorRed}, ${depthAlpha * 0.95})`
            : `rgba(${colorCream}, ${depthAlpha * 0.75})`;
          
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, proj.scale * 2.2, 0, 2 * Math.PI);
          ctx.fill();
        });

      } else if (type === "data") {
        // --- 4. DATA ENGINEERING (3D Flow pipelines) ---
        const rotY = 0.25 + targetPX * 0.3;
        const rotX = -0.15 + targetPY * 0.3;

        // Tracks definition
        const numTracks = 3;
        const trackXOffsets = [-30, 0, 30];
        const numPackets = 12;

        const packets: Point3D[] = [];

        for (let i = 0; i < numPackets; i++) {
          const trackIdx = i % numTracks;
          const tx = trackXOffsets[trackIdx];
          const ty = -45 + ((i * 15 + time * 35) % 90); // Travel vertically down
          
          // Give it a slightly offset z position
          const tz = -30 + trackIdx * 30;

          let [rx, ry, rz] = rotateY(tx, ty, tz, rotY);
          [rx, ry, rz] = rotateX(rx, ry, rz, rotX);
          packets.push({ x: rx, y: ry, z: rz, size: 2 });
        }

        // Project track lines
        const trackLines: { start: ProjectedPoint; end: ProjectedPoint }[] = [];
        trackXOffsets.forEach((tx) => {
          const tz = -30 + trackXOffsets.indexOf(tx) * 30;
          
          let [rxS, ryS, rzS] = rotateY(tx, -50, tz, rotY);
          [rxS, ryS, rzS] = rotateX(rxS, ryS, rzS, rotX);
          
          let [rxE, ryE, rzE] = rotateY(tx, 50, tz, rotY);
          [rxE, ryE, rzE] = rotateX(rxE, ryE, rzE, rotX);

          trackLines.push({
            start: project(rxS, ryS, rzS, width, height),
            end: project(rxE, ryE, rzE, width, height),
          });
        });

        // Draw track pipes
        ctx.strokeStyle = `rgba(${colorCream}, 0.05)`;
        ctx.lineWidth = 1;
        trackLines.forEach((line) => {
          ctx.beginPath();
          ctx.moveTo(line.start.x, line.start.y);
          ctx.lineTo(line.end.x, line.end.y);
          ctx.stroke();
        });

        // Project packets
        const projectedPackets = packets.map((p) => ({
          proj: project(p.x, p.y, p.z, width, height),
          orig: p,
        }));

        // Sort by depth
        projectedPackets.sort((a, b) => b.proj.zVal - a.proj.zVal);

        // Draw horizontal connector pulses
        if (hoverState.current) {
          ctx.strokeStyle = `rgba(${colorRed}, 0.08)`;
          ctx.lineWidth = 1;
          for (let y = -30; y <= 30; y += 20) {
            let [rxS, ryS, rzS] = rotateY(-35, y, 0, rotY);
            [rxS, ryS, rzS] = rotateX(rxS, ryS, rzS, rotX);
            let [rxE, ryE, rzE] = rotateY(35, y, 0, rotY);
            [rxE, ryE, rzE] = rotateX(rxE, ryE, rzE, rotX);
            const pS = project(rxS, ryS, rzS, width, height);
            const pE = project(rxE, ryE, rzE, width, height);
            ctx.beginPath();
            ctx.moveTo(pS.x, pS.y);
            ctx.lineTo(pE.x, pE.y);
            ctx.stroke();
          }
        }

        // Draw packets (data blocks)
        projectedPackets.forEach(({ proj }) => {
          const depthAlpha = Math.max(0.15, (proj.zVal + 50) / 100);
          
          ctx.fillStyle = hoverState.current
            ? `rgba(${colorRed}, ${depthAlpha * 0.9})`
            : `rgba(${colorCream}, ${depthAlpha * 0.7})`;
          
          const size = proj.scale * 2.5;
          ctx.fillRect(proj.x - size / 2, proj.y - size / 2, size, size);
        });

      } else if (type === "intelligence") {
        // --- 5. EXPERIENCE INTELLIGENCE (Neural net & travel signal pulses) ---
        const rotY = time * 0.25 + targetPX;
        const rotX = time * 0.2 + targetPY;

        // Project brain nodes
        const projectedNodes = intelNodes.map((n) => {
          let [rx, ry, rz] = rotateY(n.x, n.y, n.z, rotY);
          [rx, ry, rz] = rotateX(rx, ry, rz, rotX);
          return project(rx, ry, rz, width, height);
        });

        // Draw connections
        ctx.strokeStyle = `rgba(${colorCream}, 0.05)`;
        ctx.lineWidth = 1;
        for (let i = 0; i < projectedNodes.length; i++) {
          for (let j = i + 1; j < projectedNodes.length; j++) {
            const dx = intelNodes[i].x - intelNodes[j].x;
            const dy = intelNodes[i].y - intelNodes[j].y;
            const dz = intelNodes[i].z - intelNodes[j].z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (dist < 40) {
              const p1 = projectedNodes[i];
              const p2 = projectedNodes[j];
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Update and draw traveling signals
        signals.forEach((sig) => {
          sig.progress += sig.speed;
          if (sig.progress >= 1) {
            sig.progress = 0;
            sig.fromIndex = sig.toIndex;
            // Pick a new close neighbor to travel to
            let closestIdx = Math.floor(Math.random() * 15);
            let minDist = 9999;
            for (let i = 0; i < 15; i++) {
              if (i === sig.fromIndex) continue;
              const dx = intelNodes[sig.fromIndex].x - intelNodes[i].x;
              const dy = intelNodes[sig.fromIndex].y - intelNodes[i].y;
              const dz = intelNodes[sig.fromIndex].z - intelNodes[i].z;
              const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
              if (dist < minDist) {
                minDist = dist;
                closestIdx = i;
              }
            }
            sig.toIndex = closestIdx;
          }

          // Linear interpolation in 3D
          const pS = intelNodes[sig.fromIndex];
          const pE = intelNodes[sig.toIndex];
          const sx = pS.x + (pE.x - pS.x) * sig.progress;
          const sy = pS.y + (pE.y - pS.y) * sig.progress;
          const sz = pS.z + (pE.z - pS.z) * sig.progress;

          let [rx, ry, rz] = rotateY(sx, sy, sz, rotY);
          [rx, ry, rz] = rotateX(rx, ry, rz, rotX);
          const pProj = project(rx, ry, rz, width, height);

          // Draw signal dot
          ctx.fillStyle = `rgba(${colorRed}, 0.9)`;
          ctx.beginPath();
          ctx.arc(pProj.x, pProj.y, pProj.scale * 2.8, 0, 2 * Math.PI);
          ctx.fill();
        });

        // Draw nodes
        projectedNodes.forEach((p) => {
          const depthAlpha = Math.max(0.1, (p.zVal + 45) / 90);
          ctx.fillStyle = `rgba(${colorCream}, ${depthAlpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 1.5, 0, 2 * Math.PI);
          ctx.fill();
        });

      } else if (type === "transformation") {
        // --- 6. DIGITAL TRANSFORMATION (Shifting wireframe morphing octahedron) ---
        const rotY = time * 0.35 + targetPX * 0.6;
        const rotX = time * 0.25 + targetPY * 0.6;

        // Base vertices of octahedron
        const r = 38;
        const morphVal = Math.sin(time * 2) * 12; // Shifting warp factor

        const vertices: Point3D[] = [
          { x: 0, y: r + morphVal, z: 0 },
          { x: 0, y: -r - morphVal, z: 0 },
          { x: r - morphVal, y: 0, z: 0 },
          { x: -r + morphVal, y: 0, z: 0 },
          { x: 0, y: 0, z: r + morphVal * 0.5 },
          { x: 0, y: 0, z: -r - morphVal * 0.5 },
        ];

        // Project vertices
        const projectedVerts = vertices.map((v) => {
          let [rx, ry, rz] = rotateY(v.x, v.y, v.z, rotY);
          [rx, ry, rz] = rotateX(rx, ry, rz, rotX);
          return project(rx, ry, rz, width, height);
        });

        // Triangle faces indices
        const faces = [
          [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
          [1, 2, 4], [1, 4, 3], [1, 3, 5], [1, 5, 2]
        ];

        // Draw shaded faces (light opacity back-to-front sorting is cool, but for wireframe simple outlines are gorgeous)
        faces.forEach((face) => {
          const p1 = projectedVerts[face[0]];
          const p2 = projectedVerts[face[1]];
          const p3 = projectedVerts[face[2]];

          // Face depth
          const avgZ = (p1.zVal + p2.zVal + p3.zVal) / 3;
          const depthAlpha = Math.max(0.02, (avgZ + 45) / 90);

          ctx.fillStyle = hoverState.current
            ? `rgba(${colorRed}, ${depthAlpha * 0.15})`
            : `rgba(${colorCream}, ${depthAlpha * 0.04})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();
          ctx.fill();
        });

        // Draw wireframe edges
        ctx.strokeStyle = hoverState.current
          ? `rgba(${colorRed}, 0.5)`
          : `rgba(${colorCream}, 0.15)`;
        ctx.lineWidth = 1.2;
        
        faces.forEach((face) => {
          const p1 = projectedVerts[face[0]];
          const p2 = projectedVerts[face[1]];
          const p3 = projectedVerts[face[2]];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();
          ctx.stroke();
        });

        // Highlight vertices
        projectedVerts.forEach((p) => {
          ctx.fillStyle = hoverState.current ? `rgb(${colorRed})` : `rgb(${colorCream})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 2.2, 0, 2 * Math.PI);
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    // Start loop
    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="w-[140px] h-[140px] pointer-events-none select-none relative z-10"
      style={{ display: "block" }}
    />
  );
}
