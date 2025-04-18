import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

export const predictionService = {
  submitPrediction: async (formData) => {
    try {
      const user = (await supabase.auth.getUser()).data.user
      
      if (!user) {
        throw new Error('User not authenticated')
      }
      

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId: user.id
        }),
      })
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      
      const result = await response.json()
      

      await supabase.from('predictions')
        .insert({
          user_id: user.id,
          input_data: formData,
          result: result.prediction,
          probability: result.probability,
          timestamp: new Date()
        })
      
      return result
    } catch (error) {
      console.error('Prediction error:', error)
      throw error
    }
  },
  
  getPredictionHistory: async () => {
    try {
      const user = (await supabase.auth.getUser()).data.user
        
      if (!user) {
        throw new Error('User not authenticated')
      }
      
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('History error:', error)
      throw error
    }
  }
} 