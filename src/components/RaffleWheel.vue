<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRaffleStore } from '@/stores/raffle'

const store = useRaffleStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

const size = 500
const centerX = size / 2
const centerY = size / 2
const radius = size / 2 - 20

const colors = [
  '#FF3366',
  '#FF9933',
  '#FFFF33',
  '#33FF66',
  '#3366FF',
  '#9933FF',
  '#FF33CC',
  '#00FFFF',
  '#FF99FF',
  '#CCFF00',
  '#FF5733',
  '#C70039',
  '#900C3F',
  '#581845',
  '#1ABC9C',
]

const rotation = ref(0)
let spinVelocity = 0
const isAnimating = false

const drawWheel = () => {
  if (!ctx || !canvasRef.value) return

  ctx.clearRect(0, 0, size, size)

  // Outer glow
  const gradient = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius + 20)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const total = store.names.length
  if (total === 0) return

  const arc = (2 * Math.PI) / total

  // Save context for rotation
  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.rotate(rotation.value)
  ctx.translate(-centerX, -centerY)

  // Shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
  ctx.shadowBlur = 15
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 5

  store.names.forEach((name, i) => {
    ctx!.beginPath()
    const angle = i * arc
    ctx!.fillStyle = colors[i % colors.length]
    ctx!.moveTo(centerX, centerY)
    ctx!.arc(centerX, centerY, radius, angle, angle + arc)
    ctx!.lineTo(centerX, centerY)
    ctx!.fill()
    ctx!.stroke()

    // Text
    ctx!.save()
    ctx!.translate(centerX, centerY)
    ctx!.rotate(angle + arc / 2)
    ctx!.textAlign = 'right'
    ctx!.fillStyle = 'white'
    ctx!.font = 'bold 16px Inter, sans-serif'
    ctx!.shadowColor = 'rgba(0,0,0,0.3)'
    ctx!.shadowBlur = 4
    ctx!.fillText(name, radius - 20, 5)
    ctx!.restore()
  })

  ctx.restore()

  // Pointer
  drawPointer()
}

const drawPointer = () => {
  if (!ctx) return
  ctx.beginPath()
  ctx.fillStyle = '#333'
  ctx.moveTo(size - 30, centerY)
  ctx.lineTo(size, centerY - 15)
  ctx.lineTo(size, centerY + 15)
  ctx.fill()
}

const spin = () => {
  if (store.isSpinning || store.names.length === 0) return

  store.isSpinning = true
  spinVelocity = Math.random() * 0.2 + 0.3 // Random initial velocity

  animate()
}

const animate = () => {
  if (spinVelocity > 0.001) {
    rotation.value += spinVelocity
    spinVelocity *= 0.985 // friction
    drawWheel()
    requestAnimationFrame(animate)
  } else {
    store.isSpinning = false
    determineWinner()
  }
}

const determineWinner = () => {
  const total = store.names.length
  const arc = (2 * Math.PI) / total

  // Normalize rotation
  const currentRotation = rotation.value % (2 * Math.PI)

  // The pointer is at 0 degrees (right side) relative to the canvas,
  // but we rotated the whole context.
  // We need to find which segment is at the pointer.
  // Actually, wait, pointer is at 0 (3 o'clock) on the canvas context?
  // My drawPointer is at (size, centerY) which corresponds to angle 0 in canvas arc.

  // The wheel rotates CLOCKWISE (positive angle).
  // So the segment at 0 is the one that started at -rotation.

  let angleAtPointer = (0 - currentRotation) % (2 * Math.PI)
  if (angleAtPointer < 0) angleAtPointer += 2 * Math.PI

  const winningIndex = Math.floor(angleAtPointer / arc)

  const winner = store.names[winningIndex]
  store.setWinner(winner)
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    drawWheel()
  }
})

watch(
  () => store.names,
  () => {
    drawWheel()
  },
  { deep: true },
)
</script>

<template>
  <div class="wheel-container">
    <canvas ref="canvasRef" :width="size" :height="size" @click="spin"></canvas>
    <div class="center-circle" @click="spin">
      <span v-if="!store.isSpinning">SPIN</span>
    </div>
  </div>
</template>

<style scoped>
.wheel-container {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 0.2s;
}

.wheel-container:hover {
  transform: scale(1.02);
}

.center-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: #ff3366;
  z-index: 10;
  border: 4px solid #fff;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
