import get from 'lodash.get'

export async function doPost<Response> (url: string, body: string, headers: HeadersInit = {}): Promise<Response | null> {
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', ...headers }, method: 'POST', body })
  if (!response.ok) {
    throw new Error(get(response.body, 'error'))
  }
  const text = await response.text()
  return text ? JSON.parse(text) as Response : null
}

export async function doPut<Response> (url: string, body: string, headers: HeadersInit = {}): Promise<Response | null> {
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', ...headers }, method: 'PUT', body })
  if (!response.ok) {
    throw new Error(get(response.body, 'error'))
  }
  const text = await response.text()
  return text ? JSON.parse(text) as Response : null
}

export async function doGet<Response> (url: string, headers: HeadersInit = {}): Promise<Response | null> {
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', ...headers }, method: 'GET' })
  if (!response.ok) {
    throw new Error(get(response.body, 'error'))
  }
  const text = await response.text()
  return text ? JSON.parse(text) as Response : null
}
