import React, {useEffect, useMemo, useState} from 'react';
import propTypes from "prop-types";
import './styles.css';
import ErrorMessages from "../error-messages";
import Select from "../select";

const ConfigureArticleForm = (props) => {
  const [formData, setFormData] = useState({
    _id: props.article._id,
    name: props.article.name ?? 'default-name',
    title: props.article.title ?? '',
    description: props.article.description ?? '',
    maidIn: {
      _id: props.article.maidIn?._id
    },
    category: {
      _id: props.article.category?._id
    },
    edition: props.article.edition ?? '',
    price: props.article.price ?? ''
  });

  useEffect(() => {
    setFormData({
      _id: props.article._id,
      name: props.article.name ?? 'default-name',
      title: props.article.title ?? '',
      description: props.article.description ?? '',
      maidIn: {
        _id: props.article.maidIn?._id
      },
      category: {
        _id: props.article.category?._id
      },
      edition: props.article.edition ?? '',
      price: props.article.price ?? ''
    })
  }, [props.article])

  const [formErrors, setFormErrors] = useState(props.validationErrors)

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(formData)
  }

  const handleFormChange = (event) => {
    if (event.target.name === 'category' || event.target.name === 'maidIn') {
      setFormData({
        ...formData,
        [event.target.name]: {
          _id: event.target.value
        }
      })
      setFormErrors({
        ...formErrors,
        [event.target.name]: []
      })
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      })
      setFormErrors({
        ...formErrors,
        [event.target.name]: []
      })
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit}>

      <label>Название</label>
      <input type="text" name="title" value={formData.title} onChange={handleFormChange}/>
      <ErrorMessages errors={formErrors.title} />

      <label>Описание</label>
      <textarea name="description" rows={5} value={formData.description}
                onChange={handleFormChange}/>
      <ErrorMessages errors={formErrors.description} />

      <label>Страна производитель</label>
      <Select
        onChange={handleFormChange}
        value={formData.maidIn._id}
        options={props.countries}
        name={'maidIn'}
      />
      <ErrorMessages errors={formErrors.maidIn} />

      <label>Категория</label>
      <Select
        onChange={handleFormChange}
        value={formData.category._id}
        options={props.categories}
        name={'category'}
      />
      <ErrorMessages errors={formErrors.category} />

      <label>Год выпуска</label>
      <input type="text" name="edition" value={formData.edition} onChange={handleFormChange}/>
      <ErrorMessages errors={formErrors.edition} />

      <label>Цена (₽)</label>
      <input type="text" name="price" value={formData.price} onChange={handleFormChange}/>
      <ErrorMessages errors={formErrors.price} />

      <button disabled={props.isSubmitDisabled} type='submit'>Сохранить</button>
    </form>
  )
};

ConfigureArticleForm.propTypes = {
  categories: propTypes.array,
  article: propTypes.object,
  countries: propTypes.array,
  onSubmit: propTypes.func,
  isSubmitDisabled: propTypes.bool,
  validationErrors: propTypes.object
}

ConfigureArticleForm.defaultProps = {
  categories: [],
  article: {},
  countries: [],
  onSubmit: () => {},
  isSubmitDisabled: false,
  validationErrors: {}
}

export default React.memo(ConfigureArticleForm);
