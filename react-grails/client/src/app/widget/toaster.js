import { Position, Toaster, Intent } from '@blueprintjs/core'

/** Singleton toaster instance. Create separate instances for different options. */
export const toaster = Toaster.create({
   position: Position.TOP,
   canEscapeKeyClear: true,
   maxToasts: 3
})

const duration = 2500

export const toastSuccess = (msg, durationInMilliseconds) => toaster.show({
   message: msg,
   intent: Intent.SUCCESS,
   timeout: duration
})

export const toastDanger = (msg, durationInMilliseconds) => toaster.show({
   message: msg,
   intent: Intent.DANGER,
   timeout: duration
})

export const toastPrimary = (msg, durationInMilliseconds) => toaster.show({
   message: msg,
   intent: Intent.PRIMARY,
   timeout: duration
})

export const toastWarning = (msg, durationInMilliseconds) => toaster.show({
   message: msg,
   intent: Intent.WARNING,
   timeout: duration
})
