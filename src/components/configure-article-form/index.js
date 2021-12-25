import React, {useCallback, useEffect, useMemo, useState} from 'react';
import propTypes from "prop-types";
import './styles.css';
import ErrorMessages from "../error-messages";
import Select from "../select";
import {cn} from "@bem-react/classname";
import Input from "../input";

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
    setFormErrors(props.validationErrors)
  }, [props.article, props.validationErrors])

  const [formErrors, setFormErrors] = useState(props.validationErrors)

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(formData)
  }

  const onHandleChange = useCallback(formItem => {
    return (e) => {
      if (formItem === 'category' || formItem === 'maidIn') {
        setFormData({
          ...formData,
          [formItem]: {
            _id: e.target.value
          }
        })
        return
      }

      setFormData({
        ...formData,
        [formItem]: e.target.value
      })

      setFormErrors({
        ...formErrors,
        [formItem]: []
      })
    }
  }, [setFormData, setFormErrors]);

  const className = cn('Form');

  return (
    <form className={className()} onSubmit={handleSubmit}>

      <label>Название</label>
      <Input value={formData.title} onChange={onHandleChange('title')} type={'text'} placeholder={'Title'} />
      {/*<input type="text" className={className("title")} value={formData.title} onChange={onHandleChange('title')}/>*/}
      <ErrorMessages errors={formErrors.title} />

      <label>Описание</label>
      <textarea rows={5} value={formData.description} onChange={onHandleChange('description')}/>
      <ErrorMessages errors={formErrors.description} />

      <label>Страна производитель</label>
      <div className={'maidIn'}>
        <Select
          onChange={onHandleChange('maidIn')}
          value={formData.maidIn._id}
          options={props.countries}
        />
      </div>
      <ErrorMessages errors={formErrors.maidIn} />

      <label>Категория</label>
      <div className={'category'}>
        <Select
          onChange={onHandleChange('category')}
          value={formData.category._id}
          options={props.categories}
        />
      </div>
      <ErrorMessages errors={formErrors.category} />

      <label>Год выпуска</label>
      <input type="text" className={className('edition')} value={formData.edition} onChange={onHandleChange('edition')}/>
      <ErrorMessages errors={formErrors.edition} />

      <label>Цена (₽)</label>
      <input type="text" className={className('price')} value={formData.price} onChange={onHandleChange('price')}/>
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
