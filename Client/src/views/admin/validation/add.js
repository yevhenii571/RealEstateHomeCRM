import { Button, Checkbox, Flex, FormLabel, Grid, GridItem, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react'
import Spinner from 'components/spinner/Spinner'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { HSeparator } from 'components/separator/Separator'
import { postApi } from 'services/api'
import { validationAddSchema } from 'schema/validationAddSchema'
import { toast } from 'react-toastify'



const Add = (props) => {
    const { onClose, isOpen, fetchData, setAction } = props;
    const [isLoding, setIsLoding] = useState(false)

    const initialValues = {
        name: "",
        validations: [
            {
                require: false,
                message: "",
            },
            {
                min: false,
                value: "",
                message: "",
            },
            {
                max: false,
                value: "",
                message: "",
            },
            {
                match: false,
                value: "",
                message: "",
            },
            {
                formikType: '',
                message: "",
            },
        ],
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationAddSchema,
        validate: (values) => {
            const errors = {};

            if (values?.validations && values.validations[0]?.require && !values.validations[0]?.message) {
                errors.validations = errors.validations || [];
                errors.validations[0] = errors.validations[0] || {};
                errors.validations[0].message = 'Message is required';
            }
            if (values?.validations && values.validations[1]?.min && !values.validations[1]?.value) {
                errors.validations = errors.validations || [];
                errors.validations[1] = errors.validations[1] || {};
                errors.validations[1].value = 'Value is required';
            }
            if (values?.validations && values.validations[2]?.max && !values.validations[2]?.value) {
                errors.validations = errors.validations || [];
                errors.validations[2] = errors.validations[2] || {};
                errors.validations[2].value = 'Value is required';
            }
            if (values?.validations && values.validations[3]?.match && !values.validations[3]?.value && !values.validations[3]?.message) {
                errors.validations = errors.validations || [];
                errors.validations[3] = errors.validations[3] || {};
                errors.validations[3].value = 'Value is required';
                errors.validations[3].message = 'Meassage is required';
            }
            if (values?.validations && values.validations[4]?.types && !values.validations[4]?.formikType) {
                errors.validations = errors.validations || [];
                errors.validations[4] = errors.validations[4] || {};
                errors.validations[4].formikType = 'FormikType is required';
            }
            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            AddData()
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = formik


    const AddData = async () => {
        try {
            setIsLoding(true)
            let response = await postApi('api/validation/add', values);
            if (response.status === 200) {
                fetchData()
                onClose()
                resetForm()
                setAction((pre) => !pre)
            } else {
                toast.error(response.response.data.message);
            }
        }
        catch {
        }
        finally {
            setIsLoding(false)
        }
    }

    return (
        <div>
            <Modal onClose={onClose} isOpen={isOpen} isCentered size='2xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add </ModalHeader>
                    <ModalCloseButton />
                    <HSeparator />
                    <ModalBody>
                        <>
                            <Grid templateColumns="repeat(12, 1fr)" gap={3}>
                                <GridItem colSpan={{ base: 12, sm: 6 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Name
                                    </FormLabel>
                                    <Input
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.name}
                                        name="name"
                                        placeholder='Enter Name'
                                        fontWeight='500'
                                        borderColor={errors.name && touched.name ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors.name && touched.name && errors.name}</Text>
                                </GridItem>

                                <GridItem colSpan={{ base: 12 }}>
                                    <Flex >
                                        <FormLabel display='flex' ms='4px' fontSize='lg' fontWeight='600' mb="0">
                                            Validations
                                        </FormLabel>
                                    </Flex>
                                </GridItem>

                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }} mt={8}>
                                    <Flex>
                                        <Checkbox colorScheme="brandScheme" me="10px"
                                            onChange={(e) => setFieldValue(`validations[${0}].require`, e.target.checked)}
                                        />
                                        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb="0">
                                            Require
                                        </FormLabel>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, md: 8 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Message
                                    </FormLabel>
                                    <Input
                                        disabled={values?.validations[0]?.require === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values?.validations[0]?.message}
                                        name={`validations[${0}].message`}
                                        placeholder='Enter message'
                                        fontWeight='500'
                                        borderColor={errors?.validations && touched?.validations && errors?.validations[0]?.message && touched?.validations[0]?.message ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validations && touched?.validations && touched?.validations[0]?.message && errors?.validations[0]?.message}</Text>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }} mt={8}>
                                    <Flex>
                                        <Checkbox colorScheme="brandScheme" name={`validations[${1}].min`} me="10px" onChange={(e) => setFieldValue(`validations[${1}].min`, e.target.checked)} />
                                        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb="0">
                                            Min
                                        </FormLabel>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Value
                                    </FormLabel>
                                    <Input
                                        disabled={values.validations[1].min === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validations[1].value}
                                        name={`validations[${1}].value`}
                                        placeholder='Enter Min Value'
                                        fontWeight='500'
                                        borderColor={errors?.validations && touched?.validations && errors?.validations[1]?.value && touched?.validations[1]?.value ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validations && touched?.validations && touched?.validations[1]?.value && errors?.validations[1]?.value}</Text>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Message
                                    </FormLabel>
                                    <Input
                                        disabled={values.validations[1].min === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validations[1].message}
                                        name={`validations[${1}].message`}
                                        placeholder='Enter Min message'
                                        fontWeight='500'
                                    // borderColor={errors.`validations[${1}].message` && touched.validations[1].message ? "red.300" : null}
                                    />
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }} mt={8}>
                                    <Flex>
                                        <Checkbox colorScheme="brandScheme" me="10px" name={`validations[${2}].max`} onChange={(e) => setFieldValue(`validations[${2}].max`, e.target.checked)} />
                                        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb="0">
                                            Max
                                        </FormLabel>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Value
                                    </FormLabel>
                                    <Input
                                        disabled={values.validations[2].max === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validations[2].value}
                                        name={`validations[${2}].value`}
                                        placeholder='Enter Max Value'
                                        fontWeight='500'
                                        borderColor={errors?.validations && touched?.validations && errors?.validations[2]?.value && touched?.validations[2]?.value ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validations && touched?.validations && touched?.validations[2]?.value && errors?.validations[2]?.value}</Text>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Message
                                    </FormLabel>
                                    <Input
                                        disabled={values.validations[2].max === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validations[2].massage}
                                        name={`validations[${2}].message`}
                                        placeholder='Enter Max Message'
                                        fontWeight='500'
                                        borderColor={errors.massage && touched.massage ? "red.300" : null}
                                    />
                                </GridItem>

                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }} mt={8}>
                                    <Flex>
                                        <Checkbox colorScheme="brandScheme" me="10px" name={`validations[${3}].match`} onChange={(e) => setFieldValue(`validations[${3}].match`, e.target.checked)} />
                                        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb="0">
                                            Match
                                        </FormLabel>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Value
                                    </FormLabel>
                                    <Input
                                        disabled={values.validations[3].match === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validations[3].value}
                                        name={`validations[${3}].value`}
                                        placeholder='Enter Max Value'
                                        fontWeight='500'
                                        borderColor={errors?.validations && touched?.validations && errors?.validations[3]?.value && touched?.validations[3]?.value ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validations && touched?.validations && touched?.validations[3]?.value && errors?.validations[3]?.value}</Text>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Message
                                    </FormLabel>
                                    <Input
                                        disabled={values.validations[3].match === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validations[3].massage}
                                        name={`validations[${3}].message`}
                                        placeholder='Enter Match Message'
                                        fontWeight='500'
                                        borderColor={errors?.validations && touched?.validations && errors?.validations[3]?.message && touched?.validations[3]?.message ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validations && touched?.validations && touched?.validations[3]?.message && errors?.validations[3]?.message}</Text>
                                </GridItem>

                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }} mt={8}>
                                    <Flex>
                                        <Checkbox colorScheme="brandScheme" name={`validations[${4}].types`} me="10px" onChange={(e) => setFieldValue(`validations[${4}].types`, e.target.checked)} />
                                        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb="0">
                                            Formik Type
                                        </FormLabel>
                                    </Flex>
                                </GridItem>

                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        FormikType
                                    </FormLabel>
                                    <Select
                                        disabled={values?.validations[4]?.types === true ? false : true}
                                        value={values.validations[4].formikType}
                                        name={`validations[${4}].formikType`}
                                        onChange={handleChange}
                                        fontWeight='500'
                                        placeholder={'Select Type'}
                                        borderColor={errors?.validations && touched?.validations && errors?.validations[4]?.formikType && touched?.validations[4]?.formikType ? "red.300" : null}
                                    >
                                        <option value='string'>String </option>
                                        <option value='number'>Number </option>
                                        <option value='boolean'>Boolean </option>
                                        <option value='date'>Date </option>
                                        <option value='object'>Object </option>
                                        <option value='array'>Array </option>
                                        <option value='mixed'>Mixed  </option>
                                    </Select>
                                    <Text mb='10px' color={'red'}> {errors?.validations && touched?.validations && touched?.validations[4]?.formikType && errors?.validations[4]?.formikType}</Text>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Message
                                    </FormLabel>
                                    <Input
                                        disabled={values?.validations[4]?.types === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validations[3].massage}
                                        name={`validations[${3}].message`}
                                        placeholder='Enter Formik Type Message'
                                        fontWeight='500'
                                        borderColor={errors?.validations && touched?.validations && errors?.validations[3]?.message && touched?.validations[3]?.message ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validations && touched?.validations && touched?.validations[3]?.message && errors?.validations[3]?.message}</Text>
                                </GridItem>

                            </Grid>
                        </>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="brand" size='sm' mr={2} disabled={isLoding ? true : false} onClick={handleSubmit}>{isLoding ? <Spinner /> : 'Save'}</Button>
                        <Button variant="outline" size='sm' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Add
