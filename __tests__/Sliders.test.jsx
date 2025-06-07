/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react'
import { Slide as ArtistSlide } from '../src/assets/components/Sliders/ArtistsPageSliders/ArtistsPageNewsArtistsSlider.jsx'
import { Slide as ExhibitionSlide } from '../src/assets/components/Sliders/ExhibitionsPageSlider/ExhibitionsPageNewsSlider.jsx'
import { Slide as ArtTermSlide } from '../src/assets/screens/ArtTerms/ArtTermSlider.jsx'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { language: 'en' } }),
}))

jest.mock('swiper/react')
jest.mock('swiper/modules')
jest.mock('swiper/css', () => ({}))
jest.mock('swiper/css/navigation', () => ({}))
jest.mock('swiper/css/pagination', () => ({}))

describe('Slider slides navigation', () => {
  test('artist slide navigates on click', () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)
    const post = { id: 1, images: '', title_en: 't', title_uk: 't', content_en: 'c', content_uk: 'c' }
    const { container } = render(<ArtistSlide post={post} baseUrl="" />)
    fireEvent.click(container.querySelector('.NewsSliderCardLink'))
    expect(navigate).toHaveBeenCalledWith(`/posts/${post.id}`)
  })

  test('exhibition slide navigates on click', () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)
    const post = { id: 2, images: '', title_en: 't', title_uk: 't', content_en: 'c', content_uk: 'c' }
    const { container } = render(<ExhibitionSlide post={post} baseUrl="" />)
    fireEvent.click(container.querySelector('.NewsSliderCardLink'))
    expect(navigate).toHaveBeenCalledWith(`/posts/${post.id}`)
  })

  test('art term slide navigates on click', () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)
    const artTerm = { id: 3, highlightedProduct: {}, title_en: 't', title_uk: 't', content_en: 'c', content_uk: 'c' }
    const { container } = render(<ArtTermSlide artTerm={artTerm} baseUrl="" />)
    fireEvent.click(container.querySelector('.NewsSliderCardLink'))
    expect(navigate).toHaveBeenCalledWith(`/art-terms/${artTerm.id}`)
  })
})
