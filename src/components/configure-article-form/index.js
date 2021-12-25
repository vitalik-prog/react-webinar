import React, {useCallback, useEffect, useMemo, useState} from 'react';
import propTypes from "prop-types";
import './styles.css';
import ErrorMessages from "../error-messages";
import Select from "../select";
import {cn} from "@bem-react/classname";
import Input from "../input";
import Textarea from "../textarea";

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

  const onHandleChange = formItem => {
    return (value) => {
      setFormData({
        ...formData,
        [formItem]: value
      })

      setFormErrors({
        ...formErrors,
        [formItem]: []
      })
    }
  };

  const onHandleSelect = formItem => {
    return (e) => {
      setFormData({
        ...formData,
        [formItem]: {
          _id: e.target.value
        }
      })

      setFormErrors({
        ...formErrors,
        [formItem]: []
      })
    }
  };

  const className = cn('Form');

  return (
    <form className={className()} onSubmit={handleSubmit}>

      <label>
        Название
        <Input value={formData.title} onChange={onHandleChange('title')} type={'text'} placeholder={'Title'} />
      </label>
      <ErrorMessages errors={formErrors.title} />

      <label>
        Описание
        <Textarea value={formData.description} onChange={onHandleChange('description')} />
      </label>
      <ErrorMessages errors={formErrors.description} />

      <label>
        Страна производитель
        <Select
          onChange={onHandleSelect('maidIn')}
          value={formData.maidIn._id}
          options={props.countries}
        />
      </label>
      <ErrorMessages errors={formErrors.maidIn} />

      <label>
        Категория
        <Select
          onChange={onHandleSelect('category')}
          value={formData.category._id}
          options={props.categories}
        />
      </label>
      <ErrorMessages errors={formErrors.category} />

      <label>
        Год выпуска
        <Input value={formData.edition} onChange={onHandleChange('edition')} type={'text'} placeholder={'Edition'} />
      </label>
      <ErrorMessages errors={formErrors.edition} />

      <label>
        Цена (₽)
        <Input value={formData.price} onChange={onHandleChange('price')} type={'text'} placeholder={'Price'} />
      </label>
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
