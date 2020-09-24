from django import forms
from django_countries.fields import CountryField
from django_countries.widgets import CountrySelectWidget

PAYMENT_CHOICES = (
    ('S','Stripe'),
    ('P','Paypal'),
)

class CheckoutForm(forms.Form):
    use_default_shipping = forms.BooleanField(widget=forms.CheckboxInput(), required=False)
    street_address = forms.CharField( widget=forms.TextInput(attrs={
        'placeholder':'125 Main St '
    }), required=False)
    apartment_address = forms.CharField( required=False, widget=forms.TextInput(attrs={
        'placeholder':'Royal Enclave'
    }))
    country = CountryField( blank_label='(Select Country)' ).formfield(
        widget=CountrySelectWidget(attrs={
            'class': 'custom-select d-block w-100',
        }), required=False
    )
    zip = forms.CharField( widget=forms.TextInput(attrs={
        'placeholder':'Enter Zip-Code'
    }), required=False)
    set_default_shipping = forms.BooleanField(widget=forms.CheckboxInput(), required=False)
    payment_option=forms.ChoiceField( choices=PAYMENT_CHOICES, widget=forms.RadioSelect())


class CouponForm(forms.Form):
    code=forms.CharField(max_length=15, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Promo code',
        'aria-label': 'Recipient\'s username',
        'aria-describedby': 'basic-addon2'
    }))


class PaymentForm(forms.Form):
    stripeToken = forms.CharField(required=False)
    save = forms.BooleanField(required=False)
    use_default = forms.BooleanField(required=False)
