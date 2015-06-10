#!/usr/bin/env bash

action=$1

network_service='Wi-Fi'
proxy_host='localhost'
proxy_port='10086'

get_network_info() {
  echo all the network services:
  echo
  networksetup -listallnetworkservices
  echo
}

get_proxy() {
  networksetup -getwebproxy $network_service
}

set_proxy() {
  networksetup -setwebproxy $network_service $proxy_host $proxy_port
}

close_proxy() {
  networksetup -setwebproxystate $network_service off
}

enable_proxy() {
  networksetup -setwebproxystate $network_service on
}

usage() {
  echo 'osxproxy network|status|set|off|on'
}

case $action in
  network)
    get_network_info
  ;;
  status)
    get_proxy
  ;;
  set)
    set_proxy
  ;;
  off)
    close_proxy
  ;;
  on)
    enable_proxy
  ;;
  *)
    usage
  ;;
esac
