#!/bin/bash
module_name=$1

nest g mo modules/$module_name
nest g co modules/$module_name
nest g s modules/$module_name