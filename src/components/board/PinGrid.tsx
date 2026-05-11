'use client'

import type { BoardPin } from '@/types'
import { MentorNotePin } from './pins/MentorNotePin'
import { SalaryInsightPin } from './pins/SalaryInsightPin'
import { MoneyMovePin } from './pins/MoneyMovePin'
import { PurchasePausePin } from './pins/PurchasePausePin'
import { OpportunityPin } from './pins/OpportunityPin'
import { CareerActionPin } from './pins/CareerActionPin'
import { AskBoardPin } from './pins/AskBoardPin'
import { FinancialPlanPin } from './pins/FinancialPlanPin'

interface PinGridProps {
  pins: BoardPin[]
  onPinClick: (pinId: string) => void
}

function renderPin(pin: BoardPin, onClick: () => void) {
  switch (pin.type) {
    case 'mentor_note':    return <MentorNotePin    key={pin.id} pin={pin} onClick={onClick} />
    case 'salary_check':   return <SalaryInsightPin  key={pin.id} pin={pin} onClick={onClick} />
    case 'money_move':     return <MoneyMovePin       key={pin.id} pin={pin} onClick={onClick} />
    case 'purchase_pause': return <PurchasePausePin   key={pin.id} pin={pin} onClick={onClick} />
    case 'opportunity':    return <OpportunityPin     key={pin.id} pin={pin} onClick={onClick} />
    case 'career_action':  return <CareerActionPin    key={pin.id} pin={pin} onClick={onClick} />
    case 'ask_board':      return <AskBoardPin        key={pin.id} pin={pin} onClick={onClick} />
    case 'financial_plan': return <FinancialPlanPin   key={pin.id} pin={pin} onClick={onClick} />
    default:               return <MoneyMovePin       key={pin.id} pin={pin} onClick={onClick} />
  }
}

export function PinGrid({ pins, onPinClick }: PinGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
      {pins.map((pin, i) => (
        <div
          key={pin.id}
          className="animate-pin-drop"
          style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
        >
          {renderPin(pin, () => onPinClick(pin.id))}
        </div>
      ))}
    </div>
  )
}
