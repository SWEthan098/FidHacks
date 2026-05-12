'use client'

import { useState } from 'react'
import type { BoardPin } from '@/types'
import { MentorNotePin }   from './pins/MentorNotePin'
import { SalaryInsightPin } from './pins/SalaryInsightPin'
import { MoneyMovePin }     from './pins/MoneyMovePin'
import { PurchasePausePin } from './pins/PurchasePausePin'
import { OpportunityPin }   from './pins/OpportunityPin'
import { CareerActionPin }  from './pins/CareerActionPin'
import { AskBoardPin }      from './pins/AskBoardPin'
import { FinancialPlanPin } from './pins/FinancialPlanPin'
import { TrashZone }        from './TrashZone'

// Per-pin translate offsets for the scattered corkboard feel
const JITTER: { x: number; y: number }[] = [
  { x: -8,  y: 10  },
  { x: 12,  y: -6  },
  { x: -4,  y: 8   },
  { x: 8,   y: -12 },
  { x: 6,   y: -8  },
  { x: -10, y: 6   },
  { x: 10,  y: 12  },
  { x: -6,  y: -4  },
  { x: 14,  y: -10 },
  { x: -8,  y: 8   },
  { x: 4,   y: -6  },
  { x: -12, y: 10  },
]

function renderPin(pin: BoardPin, onClick: () => void, dragHandlers: {
  draggable: boolean
  onDragStart: () => void
  onDragEnd: () => void
}) {
  const props = { pin, onClick, ...dragHandlers }
  switch (pin.type) {
    case 'mentor_note':    return <MentorNotePin    key={pin.id} {...props} />
    case 'salary_check':   return <SalaryInsightPin  key={pin.id} {...props} />
    case 'money_move':     return <MoneyMovePin       key={pin.id} {...props} />
    case 'purchase_pause': return <PurchasePausePin   key={pin.id} {...props} />
    case 'opportunity':    return <OpportunityPin     key={pin.id} {...props} />
    case 'career_action':  return <CareerActionPin    key={pin.id} {...props} />
    case 'ask_board':      return <AskBoardPin        key={pin.id} {...props} />
    case 'financial_plan': return <FinancialPlanPin   key={pin.id} {...props} />
    default:               return <MoneyMovePin       key={pin.id} {...props} />
  }
}

interface PinGridProps {
  pins: BoardPin[]
  onPinClick: (pinId: string) => void
  onRemovePin: (pinId: string) => void
}

export function PinGrid({ pins, onPinClick, onRemovePin }: PinGridProps) {
  const [draggingPinId, setDraggingPinId] = useState<string | null>(null)
  const visible = pins.slice(0, 12)

  return (
    <div className="relative flex-1 overflow-y-auto">
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 px-8 pt-10 pb-16"
        style={{ overflow: 'visible' }}
      >
        {visible.map((pin, i) => {
          const jitter = JITTER[i] ?? { x: 0, y: 0 }
          const duration = 0.75 + (i % 3) * 0.06
          return (
            <div
              key={pin.id}
              style={{
                position: 'relative',
                zIndex: draggingPinId === pin.id ? 50 : i + 1,
                transform: `translate(${jitter.x}px, ${jitter.y}px)`,
              }}
            >
              <div
                style={{
                  animationName: 'sticky-land',
                  animationDuration: `${duration}s`,
                  animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  animationDelay: `${i * 110}ms`,
                  animationFillMode: 'both',
                }}
              >
                {renderPin(pin, () => onPinClick(pin.id), {
                  draggable: true,
                  onDragStart: () => setDraggingPinId(pin.id),
                  onDragEnd: () => setDraggingPinId(null),
                })}
              </div>
            </div>
          )
        })}
      </div>

      <TrashZone
        active={!!draggingPinId}
        onDrop={() => {
          if (draggingPinId) {
            onRemovePin(draggingPinId)
            setDraggingPinId(null)
          }
        }}
      />
    </div>
  )
}
