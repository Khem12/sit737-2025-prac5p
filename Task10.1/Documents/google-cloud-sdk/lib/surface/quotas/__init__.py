# -*- coding: utf-8 -*- #
# Copyright 2023 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""The main command group for Cloud Quotas."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.calliope import base


@base.ReleaseTracks(base.ReleaseTrack.BETA)
@base.UniverseCompatible
class CloudQuotasBeta(base.Group):
  """Manage Cloud Quotas quota info, quota preferences and quota adjuster settings."""

  category = base.API_PLATFORM_AND_ECOSYSTEMS_CATEGORY

  def Filter(self, context, args):
    del context, args
    base.DisableUserProjectQuota()


@base.ReleaseTracks(base.ReleaseTrack.ALPHA)
@base.UniverseCompatible
class CloudQuotas(base.Group):
  """Manage Cloud Quotas quota info and quota preferences."""

  category = base.API_PLATFORM_AND_ECOSYSTEMS_CATEGORY

  def Filter(self, context, args):
    del context, args
    base.DisableUserProjectQuota()
