import { ElementHandle } from 'puppeteer'
import logger from '../config/logger'

// Returns text content of an element handle with leading/trailing spaces
// and newlines removed or logs the error and returns null
export const getTextContent = async (
  el: ElementHandle<Element>,
  selector: string
) => {
  try {
    return (await el.$eval(selector, (_) => _.textContent))
      .replaceAll('\n', '')
      .trim()
  } catch (error: any) {}

  return null
}

// Returns href of a link handle or logs the error and returns null
export const getHref = async (el: ElementHandle<Element>, selector: string) => {
  try {
    return await el.$eval(selector, (_) => (_ as HTMLLinkElement).href)
  } catch (error: any) {}

  return null
}

// Returns src of an img handle or logs the error and returns null
export const getImgSrc = async (
  el: ElementHandle<Element>,
  selector: string
) => {
  try {
    return await el.$eval(selector, (_) => (_ as HTMLImageElement).src)
  } catch (error: any) {}

  return null
}

export const awaitAll = (list, asyncFn) => {
  const promises = []

  list.forEach((_: any) => {
    promises.push(asyncFn(_))
  })

  return Promise.all(promises)
}
